const resume_content = {
  eyebrow: "Resume_File",
  heading_lines: [
    { text: "The Whole", style: "black" },
    { text: "Record", style: "accent" }
  ],
  resume_url: "src/assets/resume/Portfolioresume_VarshaSathiskumar_Resume_.pdf",
  preview_caption: "Letter · 1 Page"
}

const download_icon_svg = `
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">
    <path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
      d="M12 3v12m0 0-4.5-4.5M12 15l4.5-4.5M4 19.5h16"/>
  </svg>
`

const render_preview_card = () => `
  <a
    href="${resume_content.resume_url}"
    target="_blank"
    rel="noopener noreferrer"
    class="resume__preview"
    aria-label="View resume in browser"
  >
    <div class="resume__preview-page">
      <embed
        src="${resume_content.resume_url}#toolbar=0&navpanes=0&scrollbar=0&view=FitH"
        type="application/pdf"
        class="resume__preview-embed"
        aria-hidden="true"
      >
      <span class="resume__preview-caption">${resume_content.preview_caption}</span>
    </div>
  </a>
`

const render_resume = (resume_root) => {
  const heading_html = resume_content.heading_lines
    .map((line) => `<span class="resume__heading-${line.style}">${line.text}</span>`)
    .join("")

  resume_root.innerHTML = `
    <div class="resume__grid">
      <div class="resume__eyebrow">
        <span class="resume__eyebrow-rule"></span>
        <span class="resume__eyebrow-label">${resume_content.eyebrow}</span>
        <span class="resume__eyebrow-rule resume__eyebrow-rule--grow"></span>
      </div>

      <div class="resume__body">
        <div class="resume__content">
          <h2 class="resume__heading">${heading_html}</h2>

          <div class="resume__actions">
            <a href="${resume_content.resume_url}" download="Varsha_Sathiskumar_Resume.pdf" class="resume__button resume__button--filled">
              ${download_icon_svg}
              Download Resume
            </a>
            <a href="${resume_content.resume_url}" target="_blank" rel="noopener noreferrer" class="resume__button resume__button--outline">
              View in Browser
            </a>
          </div>
        </div>

        ${render_preview_card()}
      </div>
    </div>
  `
}

export const initialize_resume = () => {
  const resume_root = document.getElementById("resume")
  if (!resume_root) return

  render_resume(resume_root)
}
