const experience_content = {
  heading: "Experience",
  eyebrow: "Career_Ledger",
  scroll_hint: "Scroll sideways →",
  roles: [
    {
      number: "01",
      color: "var(--color-metric-magenta)",
      company: "NociQuant Inc.",
      start_date: "Jun 2026",
      end_date: "Aug 2026",
      location: "Minnesota City, MN",
      title: "AI Software Engineer",
      employment_type: "Internship",
      specialism: "Full-Stack / Healthcare AI",
      description:
        "Built a full-stack healthcare application surfacing AI-generated differential diagnoses and medical evidence, aimed at enabling earlier diagnosis.",
      accomplishments: [
        "Engineered a RAG pipeline across 1,700+ medical papers covering 59 diseases, improving recall by 20% across 1,000 cases.",
        "Architected a multi-agent diagnostic debate system, raising diagnostic accuracy from 68% to 78% across 800 clinical cases."
      ]
    },
    {
      number: "02",
      color: "var(--color-metric-blue)",
      company: "Kimberly Clark",
      start_date: "May 2023",
      end_date: "Mar 2025",
      location: "India",
      title: "Full Stack Software Engineer",
      specialism: "Full-Stack / Enterprise Pricing",
      description:
        "Owned full-stack development of an enterprise pricing application used across 4 global regions, from feature delivery to backend performance.",
      accomplishments: [
        "Delivered 50+ features across 4 global regions, achieving over 97% user acceptance using C# and ASP.NET Core.",
        "Engineered 10+ REST APIs integrating SAP and Salesforce, supporting 15K+ monthly pricing transactions."
      ]
    },
    {
      number: "03",
      color: "var(--color-metric-green)",
      company: "Kimberly Clark",
      start_date: "Sep 2021",
      end_date: "Apr 2023",
      location: "India",
      title: "Associate Software Engineer",
      specialism: "Full-Stack / IoT & Analytics",
      description:
        "Built IoT monitoring dashboards and serverless pipelines processing real-time device data across a large multi-state facility footprint.",
      accomplishments: [
        "Supported 5,000+ users across 33M+ sq. ft., contributing to 105% higher visitor satisfaction.",
        "Built serverless Azure pipelines processing 1M+ daily IoT events, saving $68,052 annually per user."
      ]
    },
    {
      number: "04",
      color: "var(--color-metric-magenta)",
      company: "Kimberly Clark",
      start_date: "Jan 2021",
      end_date: "Aug 2021",
      location: "India",
      title: "Software Engineer Intern",
      specialism: "Automation / Consulting Platforms",
      description:
        "Designed and deployed a centralized consulting workflow tool from scratch, replacing an ad hoc process for a global team.",
      accomplishments: [
        "Served 3,000+ global team members, processing 75 weekly requests.",
        "Reduced request processing time from 1 day to 4 hours using Power Platform."
      ]
    },
    {
      number: "05",
      color: "var(--color-metric-blue)",
      company: "NIT, Trichy",
      start_date: "Dec 2019",
      end_date: "Jan 2020",
      location: "India",
      title: "Research Intern",
      specialism: "Research / Deep Learning",
      description:
        "Developed and trained a CNN-based leaf disease detection model, published as peer-reviewed research at Springer ICTIS 2020.",
      accomplishments: [
        "Designed an 8-layer CNN (5 convolution, 3 max-pooling layers) trained on 30,000+ leaf images across apple, corn, and tomato, achieving 96–98% classification accuracy.",
        {
          text: "Published findings as \"Automatic Detection of Leaf Disease Using CNN Algorithm\" at Springer ICTIS 2020.",
          url: "https://www.researchgate.net/publication/345674817_Automatic_Detection_of_Leaf_Disease_Using_CNN_Algorithm"
        }
      ]
    }
  ]
}

const render_accomplishment = (accomplishment) => {
  if (typeof accomplishment === "string") {
    return `<li class="experience-card__accomplishment">${accomplishment}</li>`
  }

  return `
    <li class="experience-card__accomplishment">
      <a href="${accomplishment.url}" target="_blank" rel="noopener noreferrer" class="experience-card__accomplishment-link">${accomplishment.text}</a>
    </li>
  `
}

const render_role_card = (role) => `
  <article class="experience-card" style="--role-color: ${role.color};">
    <div class="experience-card__label">
      <span class="experience-card__number">${role.number}</span>
      <span class="experience-card__logo" aria-hidden="true"></span>
      <span class="experience-card__company">${role.company}</span>
    </div>

    <div class="experience-card__date-bar">
      <span>${role.start_date} — ${role.end_date}</span>
      <span>${role.location}</span>
    </div>

    <div class="experience-card__body">
      <div class="experience-card__title-row">
        <h3 class="experience-card__title">${role.title}</h3>
        ${role.employment_type ? `<span class="experience-card__badge">${role.employment_type}</span>` : ""}
      </div>
      <span class="experience-card__specialism">${role.specialism}</span>
      <p class="experience-card__description">${role.description}</p>

      <hr class="experience-card__divider">

      <span class="experience-card__accomplishments-label">Key Accomplishments</span>
      <ul class="experience-card__accomplishments">
        ${role.accomplishments.map(render_accomplishment).join("")}
      </ul>
    </div>
  </article>
`

const render_experience = (experience_root) => {
  experience_root.innerHTML = `
    <div class="experience__grid">
      <h2 class="experience__heading">${experience_content.heading}</h2>
      <hr class="experience__divider">

      <div class="experience__eyebrow">
        <span class="experience__eyebrow-rule"></span>
        <span class="experience__eyebrow-label">${experience_content.eyebrow}</span>
        <span class="experience__eyebrow-rule experience__eyebrow-rule--grow"></span>
        <span class="experience__scroll-hint">${experience_content.scroll_hint}</span>
      </div>
      <hr class="experience__divider experience__divider--thin">

      <div class="experience__scroller">
        ${experience_content.roles.map(render_role_card).join("")}
      </div>
    </div>
  `
}

export const initialize_experience = () => {
  const experience_root = document.getElementById("experience")
  if (!experience_root) return

  render_experience(experience_root)
}
