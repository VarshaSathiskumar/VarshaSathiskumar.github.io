const impact_metrics_content = {
  eyebrow: "Impact_Metrics",
  metrics: [
    {
      id: "01",
      color: "var(--color-metric-green)",
      span: 3,
      layout: "split",
      stat: "$68K",
      captions: ["Saved per user, annually.", "Serving 2000+ users"]
    },
    {
      id: "02",
      color: "var(--color-metric-blue)",
      span: 2,
      layout: "stacked",
      stat: "97%",
      captions: ["UAT pass rate on delivered releases."]
    },
    {
      id: "03",
      color: "var(--color-metric-magenta)",
      span: 2,
      layout: "stacked",
      stat: "50+",
      captions: ["Features shipped across enterprise platforms."]
    },
    {
      id: "04",
      color: "var(--color-metric-orange)",
      span: 1,
      layout: "stacked",
      stat: "105%",
      captions: ["Higher visitor satisfaction."]
    },
    {
      id: "05",
      color: "var(--color-metric-purple)",
      span: 2,
      layout: "stacked",
      stat: "10+",
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

const render_metric_body = (metric) => {
  if (metric.layout === "split") {
    const [primary_caption, secondary_caption] = metric.captions

    return `
      <span class="metric-card__stat">${metric.stat}</span>
      <span class="metric-card__divider" aria-hidden="true"></span>
      <div class="metric-card__caption-group">
        <span class="metric-card__caption">${primary_caption}</span>
        <span class="metric-card__caption metric-card__caption--sub">${secondary_caption}</span>
      </div>
    `
  }

  return `
    <span class="metric-card__stat">${metric.stat}</span>
    <span class="metric-card__caption">${metric.captions[0]}</span>
  `
}

const render_metric_card = (metric) => `
  <div class="metric-card metric-card--${metric.layout}" style="grid-column: span ${metric.span}; --metric-color: ${metric.color};">
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
      <div class="impact-metrics__eyebrow">
        <span class="impact-metrics__eyebrow-rule"></span>
        <span class="impact-metrics__eyebrow-label">${impact_metrics_content.eyebrow}</span>
        <span class="impact-metrics__eyebrow-rule impact-metrics__eyebrow-rule--grow"></span>
      </div>

      <div class="impact-metrics__cards">
        ${impact_metrics_content.metrics.map(render_metric_card).join("")}
      </div>

      <h3 class="impact-metrics__publication-heading">${impact_metrics_content.publication.heading}</h3>

      <a
        href="${impact_metrics_content.publication.url}"
        target="_blank"
        rel="noopener noreferrer"
        class="impact-metrics__publication"
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

export const initialize_experience_impact_metrics = () => {
  const impact_metrics_root = document.getElementById("impact-metrics")
  if (!impact_metrics_root) return

  render_impact_metrics(impact_metrics_root)
}
