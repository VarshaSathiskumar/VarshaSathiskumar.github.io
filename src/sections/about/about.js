const about_content = {
  first_name: "Varsha",
  last_name: "Sathiskumar",
  title: "Full Stack Engineer — Enterprise and B2B",
  location: "Denver, Colorado",
  summary:
    "Software Engineer with 4+ years shipping scalable, full-stack enterprise applications — now building production-grade GenAI and Agentic AI systems, from architecture to measurable impact.",
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
              GH
            </a>
            <a href="${about_content.linkedin_url}" class="about__icon-button" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
              IN
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
  <div class="about__portrait-bubble" data-reveal="pop" aria-hidden="true">
    <span class="about__portrait-bubble-message is-active">Welcome to my portfolio!</span>
    <span class="about__portrait-bubble-message">My AI Voice Agent — Coming Soon</span>
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
