const projects_content = {
  eyebrow: "Project_Index",
  scroll_hint: "Scroll sideways →",
  heading_lines: [
    { text: "Selected", style: "black" },
    { text: "Projects", style: "accent" }
  ],
  categories: [
    { id: "personal", label: "Personal" },
    { id: "work", label: "Work" }
  ],
  projects: [
    {
      category: "work",
      number: "01",
      color: "var(--color-metric-magenta)",
      year: "2026",
      name: "NociQuant",
      one_liner:
        "Elevate diagnostic precision for chronic pain patients — an evidence-based differential diagnosis before the consultation even begins.",
      description:
        "Built an end-to-end diagnostic pipeline integrating RAG, multi-agent orchestration, and automated evaluation, improving diagnostic accuracy from 68% to 78% across 1,000 clinical cases.",
      key_metric: { value: "78%", label: "Diagnostic Accuracy" },
      impact: { value: "2026", label: "Minnesota Cup Semifinalist" },
      tech: ["React", "TypeScript", "Python", "LangChain", "LangGraph", "Pinecone"],
      link: { url: "https://nociquant.com/", label: "View_Project" }
    },
    {
      category: "work",
      number: "02",
      color: "var(--color-metric-blue)",
      year: "2021 – 2023",
      name: "Onvation",
      one_liner: "A smart restroom management solution for large-scale commercial facilities.",
      description:
        "Built an interactive IoT monitoring experience that gave users a facility-wide view of device health, alerts, usage, and setup, while supporting the rollout of new smart devices for the Version 2.0 release.",
      key_metric: { value: "105%", label: "Higher Visitor Satisfaction" },
      impact: { value: "$68K", label: "Saved Per User Annually" },
      tech: ["React", "Python", "Azure"],
      link: { url: "https://www.kcprofessional.com/en-us/solutions/onvation-smart-restroom-management-system", label: "View_Project" }
    },
    {
      category: "personal",
      number: "01",
      color: "var(--color-metric-blue)",
      year: "2026",
      name: "Voice AI Agent Integrated Website",
      one_liner: "Personal portfolio website with an integrated AI voice agent.",
      description:
        "Automated development workflows using Claude Code and built a RAG-powered OpenAI voice agent that retrieves portfolio and resume context to answer questions about my experience, projects, and technical background through natural conversation.",
      key_metric: { value: "In Progress", label: "" },
      impact: { value: "In Progress", label: "" },
      tech: ["Claude Code", "CSS", "JavaScript", "HTML", "OpenAI", "Formspree"],
      link: { url: "https://github.com/VarshaSathiskumar/VarshaSathiskumar.github.io", label: "View_Project" }
    },
    {
      category: "personal",
      number: "02",
      color: "var(--color-metric-orange)",
      year: "2026",
      name: "Product Review Summarization Platform",
      one_liner:
        "A distributed NLP pipeline turning 22GB of Amazon reviews into product-level sentiment intelligence for buyers and stakeholders.",
      description:
        "Built dashboards analyzing 12 product categories — visualizing sentiment trends, review activity, complaint rates, and semantic clusters — powered by Llama 3.1, BGE-M3, and BERTopic.",
      key_metric: { value: "84%", label: "Sentiment Accuracy" },
      impact: { value: "22GB", label: "Reviews Processed" },
      tech: ["Llama 3.1", "BGE-M3", "BERTopic"],
      link: { url: "https://github.com/VarshaSathiskumar/product-review-intelligence-platform", label: "GitHub_URL" }
    },
    {
      category: "personal",
      number: "03",
      color: "var(--color-metric-purple)",
      year: "2025",
      name: "Assessing Response Consistency across Query Variants in LLMs",
      one_liner: "An automated benchmarking pipeline comparing LLM response consistency across paraphrased queries.",
      description:
        "Built a pipeline benchmarking 5 OpenAI models across 10,000+ paraphrased queries, using DuckDB and Apache Arrow UDFs to enable faster model and prompt-consistency analysis.",
      key_metric: { value: "52%", label: "Faster Processing Time" },
      impact: { value: "10,000+", label: "Paraphrased Queries Evaluated" },
      tech: ["Python", "DuckDB", "Apache Arrow"],
      link: { url: "https://github.com/VarshaSathiskumar/LLM-response-evaluation-metrics-using-Arrow-UDF-in-DUCKDB", label: "GitHub_URL" }
    },
    {
      category: "personal",
      number: "04",
      color: "var(--color-metric-magenta)",
      year: "2020",
      name: "Leaf Disease Detection (CNN)",
      one_liner: "A deep learning model for early detection of plant leaf disease from images.",
      description:
        "Designed an 8-layer CNN trained on 30,000+ leaf images across apple, corn, and tomato, achieving 96–98% classification accuracy. Published at Springer ICTIS 2020.",
      key_metric: { value: "98%", label: "Classification Accuracy" },
      impact: { value: "30,000+", label: "Leaf Images Analyzed" },
      tech: ["Python", "TensorFlow", "PyTorch", "CNN"],
      link: {
        url: "https://www.researchgate.net/publication/345674817_Automatic_Detection_of_Leaf_Disease_Using_CNN_Algorithm",
        label: "View_Paper"
      }
    },
    {
      category: "personal",
      number: "05",
      color: "var(--color-metric-green)",
      year: "2026",
      name: "Outcrop Analog — Geospatial Web Platform",
      one_liner: "An interactive GIS platform for exploring geological survey data across the Delaware Mountain Group.",
      description:
        "Engineered an ETL pipeline consolidating 2TB+ of geological data from 30+ source files, and built a 12-layer interactive map reducing query time from 40 minutes to 2 seconds.",
      key_metric: { value: "99%", label: "Faster Query Time" },
      impact: { value: "2TB+", label: "Geological Data Consolidated" },
      tech: ["React", "FastAPI", "Mapbox GL JS", "PostgreSQL", "Supabase", "PostGIS"],
      link: { url: "https://outcropanalog.com/", label: "View_Demo" }
    }
  ]
}

const github_icon_svg = `
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">
    <path fill="currentColor" d="M12 .5C5.73.5.98 5.24.98 11.52c0 5.02 3.26 9.28 7.77 10.79.57.1.78-.25.78-.55
      0-.27-.01-1.17-.02-2.12-3.16.69-3.83-1.34-3.83-1.34-.52-1.31-1.26-1.66-1.26-1.66-1.03-.7.08-.69.08-.69
      1.14.08 1.74 1.17 1.74 1.17 1.01 1.73 2.65 1.23 3.3.94.1-.73.4-1.23.72-1.51-2.52-.29-5.17-1.26-5.17-5.6
      0-1.24.44-2.25 1.17-3.04-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.14 1.16a10.9 10.9 0 0 1 5.72 0c2.18-1.47
      3.14-1.16 3.14-1.16.62 1.57.23 2.73.11 3.02.73.79 1.17 1.8 1.17 3.04 0 4.35-2.66 5.31-5.19 5.59.41.35.77
      1.04.77 2.1 0 1.52-.01 2.74-.01 3.11 0 .3.2.66.79.55A10.53 10.53 0 0 0 23.02 11.5C23.02 5.24 18.27.5 12 .5Z"/>
  </svg>
`

const render_category_toggle = (category, active_category) => {
  const count = projects_content.projects.filter((project) => project.category === category.id).length
  const is_active = category.id === active_category

  return `
    <button
      type="button"
      class="projects__toggle-option${is_active ? " projects__toggle-option--active" : ""}"
      data-category="${category.id}"
    >
      ${category.label} · ${count}
    </button>
  `
}

const render_tech_tag = (tech) => `<span class="project-card__tech-tag">${tech}</span>`

const render_project_card = (project) => `
  <article class="project-card" data-category="${project.category}" data-reveal style="--project-color: ${project.color};">
    <div class="project-card__header">
      <span>${project.category === "work" ? "Work" : "Personal"}_${project.number}</span>
      <span>${project.year}</span>
    </div>

    <div class="project-card__body">
      <h3 class="project-card__name">${project.name}</h3>
      <p class="project-card__one-liner">${project.one_liner}</p>

      <hr class="project-card__divider">

      <p class="project-card__description">${project.description}</p>

      <div class="project-card__metrics">
        <div class="project-card__metric-box">
          <span class="project-card__metric-value">${project.key_metric.value}</span>
          <span class="project-card__metric-label">${project.key_metric.label}</span>
        </div>
        <div class="project-card__metric-box">
          <span class="project-card__metric-value">${project.impact.value}</span>
          <span class="project-card__metric-label">${project.impact.label}</span>
        </div>
      </div>

      <span class="project-card__tech-label">Technologies</span>
      <div class="project-card__tech-tags">
        ${project.tech.map(render_tech_tag).join("")}
      </div>

      <hr class="project-card__divider">

      <a href="${project.link.url}" target="_blank" rel="noopener noreferrer" class="project-card__link">
        ${github_icon_svg}
        ${project.link.label}
      </a>
    </div>
  </article>
`

const apply_category_filter = (projects_root, active_category) => {
  projects_root.querySelectorAll(".project-card").forEach((card) => {
    card.hidden = card.dataset.category !== active_category
  })

  projects_root.querySelectorAll(".projects__toggle-option").forEach((button) => {
    button.classList.toggle("projects__toggle-option--active", button.dataset.category === active_category)
  })

  const scroller = projects_root.querySelector(".projects__scroller")
  if (scroller) scroller.scrollLeft = 0
}

const attach_toggle_listeners = (projects_root) => {
  projects_root.querySelectorAll(".projects__toggle-option").forEach((button) => {
    button.addEventListener("click", () => apply_category_filter(projects_root, button.dataset.category))
  })
}

const render_projects = (projects_root) => {
  const active_category = projects_content.categories[0].id
  const heading_html = projects_content.heading_lines
    .map((line) => `<span class="projects__heading-${line.style}">${line.text}</span>`)
    .join("<br>")

  projects_root.innerHTML = `
    <div class="projects__grid">
      <div class="projects__eyebrow" data-reveal="fade">
        <span class="projects__eyebrow-rule"></span>
        <span class="projects__eyebrow-label">${projects_content.eyebrow}</span>
        <span class="projects__eyebrow-rule projects__eyebrow-rule--grow"></span>
        <span class="projects__scroll-hint">${projects_content.scroll_hint}</span>
      </div>

      <div class="projects__header-row" data-reveal>
        <h2 class="projects__heading">${heading_html}</h2>
        <div class="projects__toggle">
          ${projects_content.categories.map((category) => render_category_toggle(category, active_category)).join("")}
        </div>
      </div>

      <div class="projects__scroller" data-reveal-group>
        ${projects_content.projects.map(render_project_card).join("")}
      </div>
    </div>
  `

  apply_category_filter(projects_root, active_category)
  attach_toggle_listeners(projects_root)
}

export const initialize_projects = () => {
  const projects_root = document.getElementById("projects")
  if (!projects_root) return

  render_projects(projects_root)
}
