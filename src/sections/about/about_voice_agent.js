const voice_agent_base_url = "https://portfolio-voice-agent.onrender.com"
const openai_realtime_calls_url = "https://api.openai.com/v1/realtime/calls"

let peer_connection = null
let data_channel = null
let mic_stream = null

const render_modal = () => {
  const modal_root = document.createElement("div")
  modal_root.className = "voice-agent-modal"
  modal_root.hidden = true
  modal_root.innerHTML = `
    <div class="voice-agent-modal__backdrop" data-voice-agent-close></div>
    <div class="voice-agent-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="voice-agent-title">
      <button type="button" class="voice-agent-modal__close" data-voice-agent-close aria-label="Close">×</button>
      <h2 id="voice-agent-title" class="voice-agent-modal__title">Talk to My AI Voice Agent</h2>
      <p class="voice-agent-modal__hint">Ask about my experience, projects, or background.</p>
      <button type="button" class="voice-agent-modal__mic-button" data-voice-agent-mic aria-label="Start talking">
        <span class="voice-agent-modal__mic-icon" aria-hidden="true"></span>
      </button>
      <p class="voice-agent-modal__status" data-voice-agent-status role="status" aria-live="polite">Tap to start talking</p>
      <audio data-voice-agent-audio autoplay></audio>
    </div>
  `
  document.body.appendChild(modal_root)
  return modal_root
}

const send_event = (event) => {
  if (data_channel?.readyState === "open") {
    data_channel.send(JSON.stringify(event))
  }
}

const handle_function_call = async (name, args, call_id) => {
  if (name !== "search_resume") return

  let query = ""
  try {
    query = JSON.parse(args).query ?? ""
  } catch {
    query = ""
  }

  let results = []
  try {
    const response = await fetch(`${voice_agent_base_url}/retrieve`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query })
    })
    const data = await response.json()
    results = data.results ?? []
  } catch (error) {
    console.error("Retrieve failed:", error)
  }

  send_event({
    type: "conversation.item.create",
    item: {
      type: "function_call_output",
      call_id,
      output: JSON.stringify(results.map((result) => result.text))
    }
  })
  send_event({ type: "response.create" })
}

const handle_server_event = (event) => {
  if (event.type === "response.function_call_arguments.done") {
    handle_function_call(event.name, event.arguments, event.call_id)
  }
}

const set_status = (status_element, message) => {
  status_element.textContent = message
}

const teardown_connection = (mic_button) => {
  data_channel?.close()
  peer_connection?.close()
  mic_stream?.getTracks().forEach((track) => track.stop())

  data_channel = null
  peer_connection = null
  mic_stream = null

  mic_button.classList.remove("is-listening")
  mic_button.setAttribute("aria-label", "Start talking")
}

const stop_voice_session = (mic_button, status_element) => {
  teardown_connection(mic_button)
  set_status(status_element, "Tap to start talking")
}

const start_voice_session = async (mic_button, status_element, audio_element) => {
  mic_button.disabled = true
  set_status(status_element, "Connecting…")

  try {
    const session_response = await fetch(`${voice_agent_base_url}/session`, { method: "POST" })
    if (!session_response.ok) throw new Error(`Session request failed: ${session_response.status}`)

    const session = await session_response.json()
    const ephemeral_key = session.value

    peer_connection = new RTCPeerConnection()
    peer_connection.ontrack = (event) => {
      audio_element.srcObject = event.streams[0]
    }

    mic_stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    mic_stream.getTracks().forEach((track) => peer_connection.addTrack(track, mic_stream))

    data_channel = peer_connection.createDataChannel("oai-events")
    data_channel.addEventListener("message", (event) => handle_server_event(JSON.parse(event.data)))
    data_channel.addEventListener("open", () => send_event({ type: "response.create" }))

    const offer = await peer_connection.createOffer()
    await peer_connection.setLocalDescription(offer)

    const sdp_response = await fetch(openai_realtime_calls_url, {
      method: "POST",
      body: offer.sdp,
      headers: {
        Authorization: `Bearer ${ephemeral_key}`,
        "Content-Type": "application/sdp"
      }
    })
    if (!sdp_response.ok) throw new Error(`Voice connection failed: ${sdp_response.status}`)

    await peer_connection.setRemoteDescription({ type: "answer", sdp: await sdp_response.text() })

    mic_button.classList.add("is-listening")
    mic_button.setAttribute("aria-label", "Stop talking")
    set_status(status_element, "Listening…")
  } catch (error) {
    console.error(error)
    teardown_connection(mic_button)
    set_status(status_element, "Couldn't connect — please try again.")
  } finally {
    mic_button.disabled = false
  }
}

const attach_modal_behavior = (modal_root, bubble) => {
  const mic_button = modal_root.querySelector("[data-voice-agent-mic]")
  const status_element = modal_root.querySelector("[data-voice-agent-status]")
  const audio_element = modal_root.querySelector("[data-voice-agent-audio]")
  const close_elements = modal_root.querySelectorAll("[data-voice-agent-close]")

  const open_modal = () => {
    modal_root.hidden = false
    mic_button.focus()
  }

  const close_modal = () => {
    stop_voice_session(mic_button, status_element)
    modal_root.hidden = true
    bubble.focus()
  }

  bubble.addEventListener("click", open_modal)
  bubble.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      open_modal()
    }
  })

  close_elements.forEach((element) => element.addEventListener("click", close_modal))

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal_root.hidden) close_modal()
  })

  mic_button.addEventListener("click", () => {
    if (peer_connection) {
      stop_voice_session(mic_button, status_element)
    } else {
      start_voice_session(mic_button, status_element, audio_element)
    }
  })
}

export const initialize_about_voice_agent = () => {
  const bubble = document.querySelector(".about__portrait-bubble")
  if (!bubble) return

  const modal_root = render_modal()
  attach_modal_behavior(modal_root, bubble)
}
