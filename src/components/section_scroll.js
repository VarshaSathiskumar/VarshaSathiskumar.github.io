const scroll_lock_duration_ms = 700
const wheel_threshold = 4
const mobile_breakpoint = 640

let is_scroll_locked = false

const get_sections = () => Array.from(document.querySelectorAll(".section"))

const get_current_section_index = (sections) => {
  let closest_index = 0
  let closest_distance = Infinity

  sections.forEach((section, index) => {
    const distance = Math.abs(section.getBoundingClientRect().top)
    if (distance < closest_distance) {
      closest_distance = distance
      closest_index = index
    }
  })

  return closest_index
}

const lock_scroll = () => {
  is_scroll_locked = true
  window.setTimeout(() => {
    is_scroll_locked = false
  }, scroll_lock_duration_ms)
}

const handle_wheel = (event) => {
  if (window.innerWidth <= mobile_breakpoint) return
  if (Math.abs(event.deltaY) < wheel_threshold) return
  if (is_scroll_locked) {
    event.preventDefault()
    return
  }

  const sections = get_sections()
  const current_index = get_current_section_index(sections)
  const direction = event.deltaY > 0 ? 1 : -1
  const target_index = current_index + direction

  if (target_index < 0 || target_index >= sections.length) return

  event.preventDefault()
  lock_scroll()
  sections[target_index].scrollIntoView({ behavior: "smooth" })
}

export const initialize_section_scroll = () => {
  window.addEventListener("wheel", handle_wheel, { passive: false })
}
