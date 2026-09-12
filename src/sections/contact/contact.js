const contact_content = {
  heading_lines: [
    { text: "Get In", style: "white" },
    { text: "Touch", style: "accent" }
  ],
  channels: [
    {
      label: "Email_Channel",
      value: "varshasathiskumar@gmail.com",
      href: "mailto:varshasathiskumar@gmail.com"
    },
    {
      label: "LinkedIn",
      value: "/in/varsha-sathiskumar/",
      href: "https://linkedin.com/in/varsha-sathiskumar/"
    },
    {
      label: "GitHub",
      value: "/VarshaSathiskumar",
      href: "https://github.com/VarshaSathiskumar"
    }
  ]
}

const contact_form_fields = [
  { id: "contact-first-name", name: "first_name", label: "_First_Name", type: "text", row: "name" },
  { id: "contact-last-name", name: "last_name", label: "_Last_Name", type: "text", row: "name" },
  { id: "contact-email", name: "email", label: "_Email_Addr", type: "email" },
  { id: "contact-subject", name: "subject", label: "_Subject", type: "text" },
  { id: "contact-message", name: "message", label: "_Message_Prompt", type: "textarea" }
]

const render_channel = (channel) => `
  <div class="contact-channel">
    <span class="contact-channel__label">${channel.label}</span>
    <a href="${channel.href}" class="contact-channel__value" target="_blank" rel="noopener noreferrer">${channel.value}</a>
  </div>
`

const render_field = (field) => {
  const input_element = field.type === "textarea"
    ? `<textarea id="${field.id}" name="${field.name}" class="contact-field__input contact-field__input--textarea" rows="3"></textarea>`
    : `<input id="${field.id}" name="${field.name}" type="${field.type}" class="contact-field__input">`

  return `
    <div class="contact-field contact-field--${field.row || "full"}">
      <label for="${field.id}" class="contact-field__label">${field.label}</label>
      ${input_element}
    </div>
  `
}

const render_contact = (contact_root) => {
  const heading_html = contact_content.heading_lines
    .map((line) => `<span class="contact__heading-${line.style}">${line.text}</span>`)
    .join(" ")

  const name_fields_html = contact_form_fields
    .filter((field) => field.row === "name")
    .map(render_field)
    .join("")

  const other_fields_html = contact_form_fields
    .filter((field) => field.row !== "name")
    .map(render_field)
    .join("")

  contact_root.innerHTML = `
    <div class="contact__grid">
      <h2 class="contact__heading">${heading_html}</h2>

      <div class="contact__body">
        <div class="contact__channels">
          ${contact_content.channels.map(render_channel).join("")}
        </div>

        <form class="contact__form">
          <div class="contact-field-row">
            ${name_fields_html}
          </div>
          ${other_fields_html}

          <button type="submit" class="contact__submit">Transmit_Message</button>
        </form>
      </div>
    </div>
  `
}

export const initialize_contact = () => {
  const contact_root = document.getElementById("contact")
  if (!contact_root) return

  render_contact(contact_root)
}
