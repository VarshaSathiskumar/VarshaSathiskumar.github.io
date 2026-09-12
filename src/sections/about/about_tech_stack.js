const tech_stack_items = [
  { label: "Python", logo_src: "" },
  { label: "C#", logo_src: "" },
  { label: "SQL", logo_src: "" },
  { label: "JavaScript", logo_src: "" },
  { label: "TypeScript", logo_src: "" },
  { label: "HTML", logo_src: "" },
  { label: "CSS", logo_src: "" },
  { label: "Microsoft Azure", logo_src: "" },
  { label: "Docker", logo_src: "" },
  { label: "Kubernetes", logo_src: "" },
  { label: "React", logo_src: "" },
  { label: "Node.js", logo_src: "" },
  { label: "FastAPI", logo_src: "" },
  { label: "LangChain", logo_src: "" },
  { label: "LangGraph", logo_src: "" },
  { label: "Hugging Face", logo_src: "" },
  { label: "Redis", logo_src: "" },
  { label: "ML Libraries", logo_src: "" }
]

const placeholder_icon_svg = `
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
    <path fill="none" stroke="currentColor" stroke-width="1.6" d="M4 5.5h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1Z"/>
    <circle cx="8.3" cy="10" r="1.4" fill="currentColor" stroke="none"/>
    <path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" d="m4 16.5 4.8-4.8a1 1 0 0 1 1.4 0l3.3 3.3M14 15l2.3-2.3a1 1 0 0 1 1.4 0L21 15.9"/>
  </svg>
`

const render_tech_stack_item = (item) => {
  const image_content = item.logo_src
    ? `<img src="${item.logo_src}" alt="${item.label} logo" class="tech-stack-item__img">`
    : `
      ${placeholder_icon_svg}
      <span class="tech-stack-item__placeholder-text">Drop an image</span>
    `

  return `
    <div class="tech-stack-item">
      <div class="tech-stack-item__box">
        ${image_content}
      </div>
      <span class="tech-stack-item__label">${item.label}</span>
    </div>
  `
}

const render_about_tech_stack = (tech_stack_root) => {
  tech_stack_root.innerHTML = `
    <div class="tech-stack__grid">
      <h2 class="tech-stack__heading">TECH STACK</h2>
      <hr class="tech-stack__divider">

      <div class="tech-stack__items">
        ${tech_stack_items.map(render_tech_stack_item).join("")}
      </div>
    </div>
  `
}

export const initialize_about_tech_stack = () => {
  const tech_stack_root = document.getElementById("tech-stack")
  if (!tech_stack_root) return

  render_about_tech_stack(tech_stack_root)
}
