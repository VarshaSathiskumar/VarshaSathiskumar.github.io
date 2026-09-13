const layers_icon_svg = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M12 2.5 21 7.5 12 12.5 3 7.5Z"/>
    <path d="M3 11.5 12 16.5 21 11.5"/>
    <path d="M3 15.5 12 20.5 21 15.5"/>
  </svg>
`

const sparkles_icon_svg = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M11 3c.4 2.6 1 4.4 2 5.6 1.1 1.2 2.7 1.9 5 2.4-2.3.5-3.9 1.2-5 2.4-1 1.2-1.6 3-2 5.6-.4-2.6-1-4.4-2-5.6-1.1-1.2-2.7-1.9-5-2.4 2.3-.5 3.9-1.2 5-2.4 1-1.2 1.6-3 2-5.6Z"/>
    <path d="M18.5 2v3M17 3.5h3"/>
  </svg>
`

const about_statement_content = {
  eyebrow_label: "About Me",
  eyebrow_tag: "Build / Learn / Impact",
  lead: "I build scalable software that turns complex problems into reliable, production-ready products.",
  rows: [
    {
      icon_svg: layers_icon_svg,
      tint: "neutral",
      label: "What I Do",
      text_html:
        "My work spans full-stack engineering, distributed systems, and applied AI, with a focus on performance, maintainability, and measurable business impact."
    },
    {
      icon_svg: sparkles_icon_svg,
      tint: "accent",
      label: "What's Next",
      text_html:
        "Most recently, I’ve been building <strong>GenAI and agentic systems</strong> while pursuing my <strong>Master’s in Computer Science</strong>, expanding a strong software engineering foundation into intelligent, production-grade systems."
    }
  ],
  decorative: {
    top_label: "Complex Problems",
    bottom_label: "Real Solutions"
  }
}

const render_statement_row = (row) => `
  <div class="about-statement__row" data-reveal>
    <div class="about-statement__row-heading">
      <span class="about-statement__icon about-statement__icon--${row.tint}">${row.icon_svg}</span>
      <span class="about-statement__row-label">${row.label}</span>
    </div>
    <p class="about-statement__row-text">${row.text_html}</p>
  </div>
`

const render_decorative_dots = () => {
  const dot = `<span class="about-statement__dot"></span>`
  return `<div class="about-statement__dots">${dot.repeat(25)}</div>`
}

const render_about_statement = () => `
  <div class="about-statement">
    <div class="about-statement__main" data-reveal-group>
      <div class="about-statement__eyebrow" data-reveal="fade">
        <span class="about-statement__eyebrow-label">${about_statement_content.eyebrow_label}</span>
        <span class="about-statement__eyebrow-rule"></span>
        <span class="about-statement__eyebrow-tag">${about_statement_content.eyebrow_tag}</span>
      </div>

      <p class="about-statement__lead" data-reveal>${about_statement_content.lead}</p>

      <div class="about-statement__rows">
        ${about_statement_content.rows.map(render_statement_row).join("")}
      </div>
    </div>

    <div class="about-statement__aside" data-reveal="fade" aria-hidden="true">
      ${render_decorative_dots()}
      <span class="about-statement__aside-label">${about_statement_content.decorative.top_label}</span>
      <span class="about-statement__aside-rule"></span>
      <span class="about-statement__aside-label">${about_statement_content.decorative.bottom_label}</span>
    </div>
  </div>
`

export const initialize_about_statement = () => {
  const tech_stack_grid = document.querySelector("#tech-stack .tech-stack__grid")
  if (!tech_stack_grid) return

  // The Tech Stack heading/divider/items are grouped into their own
  // wrapper (without touching their own markup or styling) so this
  // statement can sit apart from them at the top of the shared section,
  // with the group anchored to the bottom via `.tech-stack__grid`'s
  // `justify-content: space-between`.
  const tech_stack_content = document.createElement("div")
  tech_stack_content.className = "tech-stack__content"
  Array.from(tech_stack_grid.children).forEach((child) => tech_stack_content.appendChild(child))

  tech_stack_grid.insertAdjacentHTML("afterbegin", render_about_statement())
  tech_stack_grid.appendChild(tech_stack_content)
}
