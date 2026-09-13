const impact_metrics_content = {
  eyebrow: "Impact_Metrics",
  metrics: [
    {
      id: "01",
      color: "var(--color-metric-green)",
      span: 3,
      layout: "split",
      stat: "$68K",
      animate_count: true,
      captions: ["Saved per user, annually.", "Serving 2000+ users"]
    },
    {
      id: "02",
      color: "var(--color-metric-blue)",
      span: 2,
      layout: "stacked",
      stat: "97%",
      animate_count: true,
      captions: ["UAT pass rate on delivered releases."]
    },
    {
      id: "03",
      color: "var(--color-metric-magenta)",
      span: 2,
      layout: "stacked",
      stat: "50+",
      animate_count: true,
      captions: ["Features shipped across enterprise platforms."]
    },
    {
      id: "04",
      color: "var(--color-metric-orange)",
      span: 1,
      layout: "stacked",
      stat: "105%",
      animate_count: true,
      captions: ["Higher visitor satisfaction."]
    },
    {
      id: "05",
      color: "var(--color-metric-purple)",
      span: 2,
      layout: "stacked",
      stat: "10+",
      animate_count: true,
      captions: ["REST APIs designed and shipped."]
    }
  ],
  publication: {
    heading: "Publication",
    label: "Featured Research",
    title: "Automatic Detection of Leaf Disease Using CNN Algorithm",
    meta: "Springer ICTIS 2020",
    url: "https://www.researchgate.net/publication/345674817_Automatic_Detection_of_Leaf_Disease_Using_CNN_Algorithm"
  }
}

const parse_count_target = (stat) => {
  const match = stat.match(/^(\D*)(\d+)(\D*)$/)
  if (!match) return null

  const [, prefix, digits, suffix] = match
  return { prefix, suffix, target_value: parseInt(digits, 10) }
}

const render_metric_stat = (metric) => {
  const count_target = metric.animate_count ? parse_count_target(metric.stat) : null

  if (!count_target) {
    return `<span class="metric-card__stat">${metric.stat}</span>`
  }

  return `
    <span
      class="metric-card__stat"
      data-count-up="true"
      data-count-prefix="${count_target.prefix}"
      data-count-suffix="${count_target.suffix}"
      data-count-target="${count_target.target_value}"
    >${count_target.prefix}0${count_target.suffix}</span>
  `
}

const render_metric_body = (metric) => {
  if (metric.layout === "split") {
    const [primary_caption, secondary_caption] = metric.captions

    return `
      ${render_metric_stat(metric)}
      <span class="metric-card__divider" aria-hidden="true"></span>
      <div class="metric-card__caption-group">
        <span class="metric-card__caption">${primary_caption}</span>
        <span class="metric-card__caption metric-card__caption--sub">${secondary_caption}</span>
      </div>
    `
  }

  return `
    ${render_metric_stat(metric)}
    <span class="metric-card__caption">${metric.captions[0]}</span>
  `
}

const render_metric_card = (metric) => `
  <div class="metric-card metric-card--${metric.layout}" data-reveal="scale" style="grid-column: span ${metric.span}; --metric-color: ${metric.color};">
    <div class="metric-card__label">
      <span class="metric-card__swatch"></span>
      <span>Metric_${metric.id}</span>
    </div>
    <div class="metric-card__body">
      ${render_metric_body(metric)}
    </div>
  </div>
`

const render_impact_metrics = (impact_metrics_root) => {
  impact_metrics_root.innerHTML = `
    <div class="impact-metrics__grid">
      <div class="impact-metrics__eyebrow" data-reveal="fade">
        <span class="impact-metrics__eyebrow-rule"></span>
        <span class="impact-metrics__eyebrow-label">${impact_metrics_content.eyebrow}</span>
        <span class="impact-metrics__eyebrow-rule impact-metrics__eyebrow-rule--grow"></span>
      </div>

      <div class="impact-metrics__cards" data-reveal-group>
        ${impact_metrics_content.metrics.map(render_metric_card).join("")}
      </div>

      <h3 class="impact-metrics__publication-heading" data-reveal>${impact_metrics_content.publication.heading}</h3>

      <a
        href="${impact_metrics_content.publication.url}"
        target="_blank"
        rel="noopener noreferrer"
        class="impact-metrics__publication"
        data-reveal="scale"
      >
        <div class="impact-metrics__publication-label">
          <span class="impact-metrics__publication-swatch"></span>
          <span>${impact_metrics_content.publication.label}</span>
        </div>
        <div class="impact-metrics__publication-body">
          <span class="impact-metrics__publication-title">${impact_metrics_content.publication.title}</span>
          <span class="impact-metrics__publication-meta">${impact_metrics_content.publication.meta}</span>
        </div>
        <span class="impact-metrics__publication-arrow" aria-hidden="true">→</span>
      </a>
    </div>
  `
}

const ease_out_expo = (progress) => (progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress))

const animate_count_up = (stat_element) => {
  const prefix = stat_element.dataset.countPrefix
  const suffix = stat_element.dataset.countSuffix
  const target_value = parseInt(stat_element.dataset.countTarget, 10)
  const duration_ms = 1200
  const start_time = performance.now()

  const step = (now) => {
    const progress = Math.min((now - start_time) / duration_ms, 1)
    const current_value = Math.round(target_value * ease_out_expo(progress))
    stat_element.textContent = `${prefix}${current_value}${suffix}`

    if (progress < 1) requestAnimationFrame(step)
  }

  requestAnimationFrame(step)
}

const prefers_reduced_motion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

const attach_count_up_animations = (impact_metrics_root) => {
  const stat_elements = impact_metrics_root.querySelectorAll("[data-count-up]")
  if (!stat_elements.length) return

  if (prefers_reduced_motion()) {
    stat_elements.forEach((stat_element) => {
      const prefix = stat_element.dataset.countPrefix
      const suffix = stat_element.dataset.countSuffix
      stat_element.textContent = `${prefix}${stat_element.dataset.countTarget}${suffix}`
    })
    return
  }

  const observer = new IntersectionObserver(
    (entries, current_observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return

        animate_count_up(entry.target)
        current_observer.unobserve(entry.target)
      })
    },
    { threshold: 0.4 }
  )

  stat_elements.forEach((stat_element) => observer.observe(stat_element))
}

export const initialize_experience_impact_metrics = () => {
  const impact_metrics_root = document.getElementById("impact-metrics")
  if (!impact_metrics_root) return

  render_impact_metrics(impact_metrics_root)
  attach_count_up_animations(impact_metrics_root)
}
