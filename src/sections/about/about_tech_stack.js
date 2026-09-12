const tech_icon_base_path = "src/assets/tech-icons"

const tech_stack_items = [
  { label: "Python", logo_src: `${tech_icon_base_path}/python.svg` },
  { label: "C#", logo_src: `${tech_icon_base_path}/csharp.svg` },
  { label: "SQL", logo_src: `${tech_icon_base_path}/postgresql.svg` },
  { label: "JavaScript", logo_src: `${tech_icon_base_path}/javascript.svg` },
  { label: "TypeScript", logo_src: `${tech_icon_base_path}/typescript.svg` },
  { label: "HTML", logo_src: `${tech_icon_base_path}/html5.svg` },
  { label: "CSS", logo_src: `${tech_icon_base_path}/css.svg` },
  { label: "Microsoft Azure", label_html: "Microsoft<br>Azure", logo_src: `${tech_icon_base_path}/azure.svg` },
  { label: "Docker", logo_src: `${tech_icon_base_path}/docker.svg` },
  { label: "Kubernetes", logo_src: `${tech_icon_base_path}/kubernetes.svg` },
  { label: "React", logo_src: `${tech_icon_base_path}/react.svg` },
  { label: "Node.js", logo_src: `${tech_icon_base_path}/nodejs.svg` },
  { label: "FastAPI", logo_src: `${tech_icon_base_path}/fastapi.svg` },
  { label: "LangChain", logo_src: `${tech_icon_base_path}/langchain.png` },
  { label: "LangGraph", logo_src: `${tech_icon_base_path}/langgraph.png` },
  { label: "Hugging Face", logo_src: `${tech_icon_base_path}/huggingface.svg` },
  { label: "Redis", logo_src: `${tech_icon_base_path}/redis.svg` },
  { label: "ML Libraries", logo_svg: `
    <svg viewBox="0 0 24 24" width="100%" height="100%" role="img" aria-label="ML Libraries">
      <title>ML Libraries</title>
      <circle cx="12" cy="12" r="2.6" fill="#111111"/>
      <circle cx="4.5" cy="6" r="2" fill="#111111"/>
      <circle cx="19.5" cy="6" r="2" fill="#111111"/>
      <circle cx="4.5" cy="18" r="2" fill="#111111"/>
      <circle cx="19.5" cy="18" r="2" fill="#111111"/>
      <path fill="none" stroke="#111111" stroke-width="1.4" d="M12 12L4.5 6M12 12l7.5-6M12 12l-7.5 6M12 12l7.5 6"/>
    </svg>
  ` }
]

const render_tech_stack_item = (item) => {
  const image_content = item.logo_svg
    ? item.logo_svg
    : `<img src="${item.logo_src}" alt="${item.label} logo" class="tech-stack-item__img">`

  return `
    <div class="tech-stack-item">
      <div class="tech-stack-item__box">
        ${image_content}
      </div>
      <span class="tech-stack-item__label">${item.label_html || item.label}</span>
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
