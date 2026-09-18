const contact_content = {
  heading_lines: [
    { text: "Get In", style: "white" },
    { text: "Touch", style: "accent" }
  ],
  channels: [
    {
      label: "Email_Channel",
      value: "varshasathiskumar@gmail.com",
      href: "mailto:varshasathiskumar@gmail.com"
    },
    {
      label: "LinkedIn",
      value: "/in/varsha-sathiskumar/",
      href: "https://linkedin.com/in/varsha-sathiskumar/"
    },
    {
      label: "GitHub",
      value: "/VarshaSathiskumar",
      href: "https://github.com/VarshaSathiskumar"
    }
  ]
}

const contact_form_endpoint = "https://formspree.io/f/xaenygwj"

const contact_form_fields = [
  { id: "contact-first-name", name: "first_name", label: "_First_Name", type: "text", row: "name" },
  { id: "contact-last-name", name: "last_name", label: "_Last_Name", type: "text", row: "name" },
  { id: "contact-email", name: "email", label: "_Email_Addr", type: "email" },
  { id: "contact-subject", name: "subject", label: "_Subject", type: "text" },
  { id: "contact-message", name: "message", label: "_Message_Prompt", type: "textarea" }
]

const render_channel = (channel) => `
  <div class="contact-channel" data-reveal>
    <span class="contact-channel__label">${channel.label}</span>
    <a href="${channel.href}" class="contact-channel__value" target="_blank" rel="noopener noreferrer">${channel.value}</a>
  </div>
`

const render_field = (field) => {
  const input_element = field.type === "textarea"
    ? `<textarea id="${field.id}" name="${field.name}" class="contact-field__input contact-field__input--textarea" rows="3" required></textarea>`
    : `<input id="${field.id}" name="${field.name}" type="${field.type}" class="contact-field__input" required>`

  return `
    <div class="contact-field contact-field--${field.row || "full"}" data-reveal>
      <label for="${field.id}" class="contact-field__label">${field.label}</label>
      ${input_element}
    </div>
  `
}

const render_contact = (contact_root) => {
  const heading_html = contact_content.heading_lines
    .map((line) => `<span class="contact__heading-${line.style}">${line.text}</span>`)
    .join(" ")

  const name_fields_html = contact_form_fields
    .filter((field) => field.row === "name")
    .map(render_field)
    .join("")

  const other_fields_html = contact_form_fields
    .filter((field) => field.row !== "name")
    .map(render_field)
    .join("")

  contact_root.innerHTML = `
    <div class="contact__grid">
      <h2 class="contact__heading" data-reveal>${heading_html}</h2>

      <div class="contact__body">
        <div class="contact__channels" data-reveal-group>
          ${contact_content.channels.map(render_channel).join("")}
        </div>

        <form class="contact__form" data-reveal-group>
          <div class="contact-field-row">
            ${name_fields_html}
          </div>
          ${other_fields_html}

          <button type="submit" class="contact__submit" data-reveal>Transmit_Message</button>
          <p class="contact__status" data-contact-status role="status" aria-live="polite"></p>
        </form>
      </div>
    </div>
  `
}

const attach_contact_form_handler = (contact_root) => {
  const form = contact_root.querySelector(".contact__form")
  const submit_button = contact_root.querySelector(".contact__submit")
  const status_element = contact_root.querySelector("[data-contact-status]")
  if (!form || !submit_button || !status_element) return

  const submit_label = submit_button.textContent

  form.addEventListener("submit", async (event) => {
    event.preventDefault()

    submit_button.disabled = true
    submit_button.textContent = "Transmitting..."
    status_element.textContent = ""
    status_element.classList.remove("contact__status--success", "contact__status--error")

    try {
      const response = await fetch(contact_form_endpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      })

      if (!response.ok) throw new Error("Form submission failed")

      status_element.textContent = "Message sent — thanks for reaching out."
      status_element.classList.add("contact__status--success")
      form.reset()
    } catch (error) {
      status_element.textContent = "Something went wrong — please try again or email me directly."
      status_element.classList.add("contact__status--error")
    } finally {
      submit_button.disabled = false
      submit_button.textContent = submit_label
    }
  })
}

export const initialize_contact = () => {
  const contact_root = document.getElementById("contact")
  if (!contact_root) return

  render_contact(contact_root)
  attach_contact_form_handler(contact_root)
}
