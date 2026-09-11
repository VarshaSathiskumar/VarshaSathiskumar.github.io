const about_content = {
  first_name: "Varsha",
  last_name: "Sathiskumar",
  title: "Full Stack Engineer — Enterprise and B2B",
  location: "Denver, Colorado",
  summary:
    "Distributed-system architecture instincts, full-stack fluency across backend, data and AI, and a bias toward measurable impact.",
  stats: [
    {
      label: "Experience",
      value: "4+",
      value_style: "black",
      value_variant: "numeral",
      description: "years of SDE experience — Kimberly-Clark"
    },
    {
      label: "Currently",
      value: "AI Engineer Intern",
      value_style: "accent",
      description: "NociQuant Inc."
    },
    {
      label: "Education",
      value: "MS in CS",
      value_style: "accent",
      description: "Colorado School of Mines — Dec 2026"
    }
  ],
  quote:
    "“Most software looks fine in a demo and falls apart with real users. I build the kind that doesn’t get that excuse.”",
  github_url: "https://github.com/VarshaSathiskumar",
  linkedin_url: "https://www.linkedin.com/in/varsha-sathiskumar/"
}

const github_icon_svg = `
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
    <path fill="currentColor" d="M12 .5C5.73.5.98 5.24.98 11.52c0 5.02 3.26 9.28 7.77 10.79.57.1.78-.25.78-.55
      0-.27-.01-1.17-.02-2.12-3.16.69-3.83-1.34-3.83-1.34-.52-1.31-1.26-1.66-1.26-1.66-1.03-.7.08-.69.08-.69
      1.14.08 1.74 1.17 1.74 1.17 1.01 1.73 2.65 1.23 3.3.94.1-.73.4-1.23.72-1.51-2.52-.29-5.17-1.26-5.17-5.6
      0-1.24.44-2.25 1.17-3.04-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.14 1.16a10.9 10.9 0 0 1 5.72 0c2.18-1.47
      3.14-1.16 3.14-1.16.62 1.57.23 2.73.11 3.02.73.79 1.17 1.8 1.17 3.04 0 4.35-2.66 5.31-5.19 5.59.41.35.77
      1.04.77 2.1 0 1.52-.01 2.74-.01 3.11 0 .3.2.66.79.55A10.53 10.53 0 0 0 23.02 11.5C23.02 5.24 18.27.5 12 .5Z"/>
  </svg>
`

const render_stat_card = (stat) => {
  const variant_class = stat.value_variant ? ` about-stat-card__value--${stat.value_variant}` : ""

  return `
    <div class="about-stat-card">
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
        <div class="about__content">
          <h1 class="about__name">
            <span class="about__first-name">${about_content.first_name}</span>
            <span class="about__last-name">${about_content.last_name}</span>
          </h1>

          <p class="about__title-line">
            <span>${about_content.title}</span>
            <span class="about__dot" aria-hidden="true"></span>
            <span>${about_content.location}</span>
          </p>

          <p class="about__summary">${about_content.summary}</p>
        </div>

        <div class="about__portrait" role="img" aria-label="Placeholder for a photo or illustration of Varsha Sathiskumar">
          <span class="about__portrait-label">[ Photo / Illustration ]</span>
        </div>
      </div>

      <div class="about__stats">
        ${about_content.stats.map(render_stat_card).join("")}
      </div>

      <hr class="about__divider">

      <div class="about__footer">
        <blockquote class="about__quote">${about_content.quote}</blockquote>

        <div class="about__actions">
          <a href="#contact" class="about__cta" data-nav-link="contact">Contact Me</a>
          <a href="${about_content.github_url}" class="about__icon-button" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
            ${github_icon_svg}
          </a>
          <a href="${about_content.linkedin_url}" class="about__icon-button about__icon-button--text" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
            in
          </a>
        </div>
      </div>
    </div>
  `
}

const attach_cta_listener = (about_root) => {
  const cta = about_root.querySelector("[data-nav-link]")
  if (!cta) return

  cta.addEventListener("click", (event) => {
    const section_id = cta.getAttribute("data-nav-link")
    if (!section_id) return

    event.preventDefault()
    document.getElementById(section_id)?.scrollIntoView({ behavior: "smooth" })
  })
}

export const initialize_about = () => {
  const about_root = document.getElementById("about")
  if (!about_root) return

  render_about(about_root)
  attach_cta_listener(about_root)
}
