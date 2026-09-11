const nav_items = [
  { label: "About", section_id: "about" },
  { label: "Experience", section_id: "experience" },
  { label: "Projects", section_id: "projects" },
  { label: "Resume", section_id: "resume" },
  { label: "Contact", section_id: "contact" }
]

const render_navbar = (navbar_root) => {
  navbar_root.innerHTML = `
    <nav class="navbar">
      <div class="navbar__brand">
        <span class="navbar__wordmark">Portfolio</span>
        <span class="navbar__badge">
          <span class="navbar__badge-dot"></span>
          OPEN TO WORK
        </span>
      </div>
      <ul class="navbar__links">
        ${nav_items
          .map(
            (nav_item) => `
              <li>
                <a href="#${nav_item.section_id}" class="navbar__link" data-nav-link="${nav_item.section_id}">
                  ${nav_item.label}
                </a>
              </li>
            `
          )
          .join("")}
      </ul>
    </nav>
  `
}

const attach_nav_link_listeners = () => {
  const nav_links = document.querySelectorAll("[data-nav-link]")

  nav_links.forEach((nav_link) => {
    nav_link.addEventListener("click", (event) => {
      const section_id = nav_link.getAttribute("data-nav-link")
      if (!section_id) return

      event.preventDefault()
      document.getElementById(section_id)?.scrollIntoView({ behavior: "smooth" })
    })
  })
}

export const initialize_navbar = () => {
  const navbar_root = document.getElementById("navbar-root")
  if (!navbar_root) return

  render_navbar(navbar_root)
  attach_nav_link_listeners()
}
