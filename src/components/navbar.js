export const initialize_navbar = () => {
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
