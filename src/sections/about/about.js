const about_content = {
  first_name: "Varsha",
  last_name: "Sathiskumar",
  title: "Full Stack Software Engineer",
  location: "Denver, Colorado",
  summary:
    "Software Engineer with 4+ years building scalable full-stack enterprise and B2B applications, now expanding that foundation into GenAI and Agentic AI systems that solve complex, real-world problems.",
  stats: [
    {
      label: "Experience",
      value: "4+",
      value_style: "accent",
      value_variant: "numeral",
      description: "years of SDE experience — Kimberly-Clark"
    },
    {
      label: "Focus",
      value: "Full Stack, Agentic AI and Cloud",
      value_style: "black",
      description: ""
    },
    {
      label: "Education",
      value: "MS in CS",
      value_style: "black",
      description: "Colorado School of Mines — Dec 2026"
    }
  ],
  github_url: "https://github.com/VarshaSathiskumar",
  linkedin_url: "https://www.linkedin.com/in/varsha-sathiskumar/"
}

const render_stat_card = (stat) => {
  const variant_class = stat.value_variant ? ` about-stat-card__value--${stat.value_variant}` : ""

  return `
    <div class="about-stat-card" data-reveal>
      <span class="about-stat-card__label">${stat.label}</span>
      <span class="about-stat-card__value about-stat-card__value--${stat.value_style}${variant_class}">${stat.value}</span>
      <span class="about-stat-card__description">${stat.description}</span>
    </div>
  `
}

const render_about = (about_root) => {
  about_root.innerHTML = `
    <div class="about__grid">
      <div class="about__hero">
        <div class="about__content" data-reveal-group>
          <span class="about__location" data-reveal="fade">${about_content.location}</span>

          <span class="about__greeting" data-reveal="fade">Hi, I'm</span>

          <h1 class="about__name" data-reveal>
            <span class="about__first-name">${about_content.first_name}</span>
            <span class="about__last-name">${about_content.last_name}</span>
          </h1>

          <hr class="about__name-rule">

          <p class="about__title-line" data-reveal>${about_content.title}</p>

          <p class="about__summary" data-reveal>${about_content.summary}</p>

          <div class="about__actions" data-reveal>
            <a href="#contact" class="about__cta" data-nav-link="contact">Contact Me</a>
      
            <a href="${about_content.github_url}" class="about__icon-button" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
              <svg class="about__icon-svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.72.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.7 1.25 3.35.96.1-.75.4-1.25.73-1.53-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18.92-.26 1.91-.39 2.89-.39.98 0 1.97.13 2.89.39 2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.43-2.7 5.41-5.26 5.69.42.36.78 1.08.78 2.17 0 1.57-.01 2.83-.01 3.22 0 .31.21.68.8.56C20.71 21.39 24 17.08 24 12 24 5.65 18.35.5 12 .5Z"/>
              </svg>
            </a>
            <a href="${about_content.linkedin_url}" class="about__icon-button" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
              <svg class="about__icon-svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z"/>
              </svg>
            </a>
          </div>
        </div>

        <div
  class="about__portrait"
  aria-label="Illustration of Varsha welcoming visitors to her portfolio"
>
  <img
    src="src/assets/company-logos/figure.png"
    alt="Illustration of Varsha"
    class="about__portrait-image"
  />
  <div class="about__portrait-bubble" data-reveal="pop" role="button" tabindex="0" aria-label="Talk to my AI voice agent">
    <span class="about__portrait-bubble-message is-active">Welcome to my portfolio!</span>
    <span class="about__portrait-bubble-message">Talk to my AI Voice Agent</span>
  </div>
</div>
     </div>

      <div class="about__stats" data-reveal-group>
        ${about_content.stats.map(render_stat_card).join("")}
      </div>
    </div>
  `
}

const bubble_message_hold_ms = 2800

const start_bubble_message_cycle = (about_root) => {
  const messages = Array.from(about_root.querySelectorAll(".about__portrait-bubble-message"))
  if (messages.length < 2) return

  let active_index = messages.findIndex((message) => message.classList.contains("is-active"))
  if (active_index === -1) active_index = 0

  window.setInterval(() => {
    const next_index = (active_index + 1) % messages.length
    messages[active_index].classList.remove("is-active")
    messages[next_index].classList.add("is-active")
    active_index = next_index
  }, bubble_message_hold_ms)
}

const attach_cta_listener = (about_root) => {
  about_root.querySelectorAll("[data-nav-link]").forEach((cta) => {
    cta.addEventListener("click", (event) => {
      const section_id = cta.getAttribute("data-nav-link")
      if (!section_id) return

      event.preventDefault()
      document.getElementById(section_id)?.scrollIntoView({ behavior: "smooth" })
    })
  })
}

export const initialize_about = () => {
  const about_root = document.getElementById("about")
  if (!about_root) return

  render_about(about_root)
  attach_cta_listener(about_root)
  start_bubble_message_cycle(about_root)
}
