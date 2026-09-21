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

      <button
        type="button"
        class="navbar__toggle"
        aria-label="Toggle navigation menu"
        aria-expanded="false"
        aria-controls="navbar-menu"
      >
        <span class="navbar__toggle-line"></span>
        <span class="navbar__toggle-line"></span>
        <span class="navbar__toggle-line"></span>
      </button>

      <div class="navbar__menu" id="navbar-menu">
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
      </div>
    </nav>
  `
}

const sync_navbar_height = (navbar_root) => {
  const navbar = navbar_root.querySelector(".navbar")
  if (!navbar) return

  const set_navbar_height = () => {
    document.documentElement.style.setProperty("--navbar-h", `${navbar.offsetHeight}px`)
  }

  set_navbar_height()

  if (typeof ResizeObserver === "undefined") {
    window.addEventListener("resize", set_navbar_height)
    return
  }

  new ResizeObserver(set_navbar_height).observe(navbar)
}

const attach_nav_link_listeners = (navbar_root) => {
  const nav_links = navbar_root.querySelectorAll("[data-nav-link]")

  nav_links.forEach((nav_link) => {
    nav_link.addEventListener("click", (event) => {
      const section_id = nav_link.getAttribute("data-nav-link")
      if (!section_id) return

      event.preventDefault()
      close_mobile_menu(navbar_root)
      /* Deferred a frame: on touch devices the tap that opened/targets this
         link can still be settling (finger lifting off screen) when this
         handler runs. Calling scrollIntoView in that same synchronous tick
         lets the browser's own touch-scroll handling cancel the smooth
         scroll almost immediately, most visibly on the longest jump
         (e.g. Contact back up to About) — it barely moves and the page
         stays on the section it started on. Waiting a frame lets the menu
         finish collapsing and the touch sequence settle first. */
      requestAnimationFrame(() => {
        document.getElementById(section_id)?.scrollIntoView({ behavior: "smooth" })
      })
    })
  })
}

const close_mobile_menu = (navbar_root) => {
  const navbar = navbar_root.querySelector(".navbar")
  const toggle = navbar_root.querySelector(".navbar__toggle")
  if (!navbar || !toggle) return

  navbar.classList.remove("navbar--open")
  toggle.setAttribute("aria-expanded", "false")
}

const attach_toggle_listener = (navbar_root) => {
  const navbar = navbar_root.querySelector(".navbar")
  const toggle = navbar_root.querySelector(".navbar__toggle")
  if (!navbar || !toggle) return

  toggle.addEventListener("click", () => {
    const is_open = navbar.classList.toggle("navbar--open")
    toggle.setAttribute("aria-expanded", is_open ? "true" : "false")
  })

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") close_mobile_menu(navbar_root)
  })
}

export const initialize_navbar = () => {
  const navbar_root = document.getElementById("navbar-root")
  if (!navbar_root) return

  render_navbar(navbar_root)
  sync_navbar_height(navbar_root)
  attach_nav_link_listeners(navbar_root)
  attach_toggle_listener(navbar_root)
}
