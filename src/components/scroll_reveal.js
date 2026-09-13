const stagger_step_ms = 70
const max_stagger_steps = 6
const intersection_threshold = 0.15
const intersection_root_margin = "0px 0px -10% 0px"

/* Set inline (not via a stylesheet rule) so this never collides with a
   section's own `transition` on the same element (e.g. `.metric-card`'s
   hover-lift transition) — it is cleared again once the reveal finishes,
   handing the property back to that element's normal stylesheet rules. */
const reveal_transition = [
  "opacity var(--reveal-duration) var(--reveal-ease) var(--reveal-delay, 0ms)",
  "transform var(--reveal-duration) var(--reveal-ease) var(--reveal-delay, 0ms)"
].join(", ")

const prefers_reduced_motion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches

const assign_group_stagger_delays = () => {
  document.querySelectorAll("[data-reveal-group]").forEach((group) => {
    const reveal_elements = Array.from(group.querySelectorAll("[data-reveal]"))

    reveal_elements.forEach((reveal_element, index) => {
      const capped_step = Math.min(index, max_stagger_steps)
      reveal_element.style.setProperty("--reveal-delay", `${capped_step * stagger_step_ms}ms`)
    })
  })
}

const reveal_element = (element) => {
  element.style.transition = reveal_transition
  element.style.willChange = "opacity, transform"
  element.classList.add("is-revealed")

  element.addEventListener(
    "transitionend",
    () => {
      element.style.transition = ""
      element.style.willChange = ""
    },
    { once: true }
  )
}

const observe_reveal_elements = (reveal_elements) => {
  const observer = new IntersectionObserver(
    (entries, current_observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        reveal_element(entry.target)
        current_observer.unobserve(entry.target)
      })
    },
    { threshold: intersection_threshold, rootMargin: intersection_root_margin }
  )

  reveal_elements.forEach((element) => observer.observe(element))
}

export const initialize_scroll_reveal = () => {
  const reveal_elements = Array.from(document.querySelectorAll("[data-reveal]"))
  if (!reveal_elements.length) return

  assign_group_stagger_delays()

  if (prefers_reduced_motion()) {
    reveal_elements.forEach((element) => element.classList.add("is-revealed"))
    return
  }

  observe_reveal_elements(reveal_elements)
}
