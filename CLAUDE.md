# CLAUDE.md

## Project Overview

This repository contains a personal portfolio website built with **HTML, CSS and JavaScript**.

The website is a **single-page, modular monolithic application**. Each major portfolio section must be implemented as its own isolated module/component and composed through one main application entry point.

The required page/section architecture is:

1. About
2. Experience
3. Projects
4. Resume
5. Contact

The repository includes:

- `reference/` — contains the approved UI mockups/reference images for each portfolio section.
- `verification/` — contains the verification page/material used to validate the implementation against the approved design.

The UI implementation must follow the reference images as closely and faithfully as possible.

---

## Core Development Rules

### 1. Framework

Use:

- HTML
- CSS
- JavaScript
- Standard component/module architecture
- Reusable components where repetition genuinely exists
- CSS organized by section/component or according to the existing project structure

Do not introduce a frontend framework unless explicitly requested.

Do not add unnecessary libraries or dependencies when the same result can be achieved cleanly with HTML, JavaScript and CSS.

---

## Application Architecture

Use a **modular monolithic architecture**.

The entire portfolio is one application, but each section must remain independently organized.

Recommended structure:

```text
src/
├── main.js
│
├── sections/
│   ├── about/
│   │   ├── about.js
│   │   ├── about_statement.js
│   │   ├── about_tech_stack.js
│   │   └── about.css
│   │
│   ├── experience/
│   │   ├── experience.js
│   │   ├── experience_impact_metrics.js
│   │   └── experience.css
│   │
│   ├── projects/
│   │   ├── projects.js
│   │   └── projects.css
│   │
│   ├── resume/
│   │   ├── resume.js
│   │   └── resume.css
│   │
│   └── contact/
│       ├── contact.js
│       └── contact.css
│
├── components/
│   ├── navbar.js
│   └── shared reusable components
│
└── assets/
```

### Main Composition

The main application file must connect the independent sections.

Example responsibility:

```js
import { initialize_about } from "./sections/about/about.js"
import { initialize_about_tech_stack } from "./sections/about/about_tech_stack.js"
import { initialize_experience } from "./sections/experience/experience.js"
import { initialize_experience_impact_metrics } from "./sections/experience/experience_impact_metrics.js"
import { initialize_projects } from "./sections/projects/projects.js"
import { initialize_resume } from "./sections/resume/resume.js"
import { initialize_contact } from "./sections/contact/contact.js"
import { initialize_navbar } from "./components/navbar.js"

initialize_navbar()
initialize_about()
initialize_about_tech_stack()
initialize_experience()
initialize_experience_impact_metrics()
initialize_projects()
initialize_resume()
initialize_contact()
```

Do not place the entire website implementation inside a single large JavaScript file.

---

## Required Section Order

The rendered page must follow this exact order:

```text
About
↓
About Sec
Tech Stack
↓
Experience
↓
Experience Impact Metrics
↓
Projects
↓
Resume
↓
Contact
```

Do not reorder these sections unless explicitly instructed.

---

## About Section

The About portion consists of **three consecutive visual sections**:

1. About

2. About Statement

3. Tech Stack

The About section follows the corresponding About reference mockup.

Immediately after the About section, display the About Statement containing the introductory portfolio content.

The Tech Stack section follows the About Statement and uses the Tech Stack reference design.

Keep each section as a separate component/file:

```text

sections/about/about.js

sections/about/about_statement.js

sections/about/about_tech_stack.js
```

---

## Experience Section

The Experience portion also contains **two consecutive visual sections**:

1. Experience
2. Impact Metrics

The Experience section must reproduce its corresponding reference design.

Immediately after Experience, implement the Experience Impact Metrics section.

Keep them in separate files/components.

Example:

```text
sections/experience/experience.js
sections/experience/experience_impact_metrics.js
```

---

## Reference Folder Is the Design Source of Truth

The `reference/` folder contains the approved visual mockups.

Before implementing or modifying a section:

1. Inspect the corresponding reference image.
2. Identify:
   - layout
   - grid
   - spacing
   - typography
   - alignment
   - sizing
   - colors
   - borders
   - shadows
   - cards
   - section height
   - positioning
   - responsive behavior that can reasonably be inferred
3. Implement the UI to match the reference as closely as possible.

### Design Fidelity Rule

Do **not** creatively redesign the approved UI.

Do not:

- change the visual hierarchy
- replace layouts with a different interpretation
- add decorative elements not present in the reference
- simplify major design elements
- replace an approved layout because another design is considered "better"
- introduce arbitrary colors
- introduce arbitrary gradients
- change typography styles without a technical reason

The goal is **reference fidelity**, not reinterpretation.

Minor implementation adjustments are allowed only when necessary for responsiveness, browser behavior, accessibility, or technical correctness.

---

## Content and Placeholder Rule

The reference images may contain placeholder content.

### Never invent personal information.

Do not automatically populate:

- name
- biography
- job title
- employer names
- project names
- impact metrics
- statistics
- technologies
- social links
- contact information
- resume links
- education information
- experience descriptions
- dates
- locations
- GitHub links
- LinkedIn links
- email addresses

If required information has not been provided, **ask the user what should be entered**.

Until the user provides the content, keep the relevant placeholder or use a clearly neutral placeholder.

Do not infer portfolio information from unrelated files, comments, metadata, commit history, or external sources unless explicitly instructed.

---

## Naming Convention

All developer-defined variables must use **lowercase snake_case**.

Required format:

```text
lowercase_lowercase
```

Examples:

```js
const user_name = "..."
const project_list = []
const active_section = "about"
const impact_metrics = {}
const resume_url = ""
```

Use snake_case for:

- variables
- constants
- function-local identifiers
- helper functions
- object keys created specifically for this project

Examples:

```js
let active_section = "about"

const scroll_to_section = (section_id) => {
  document.getElementById(section_id)?.scrollIntoView({
    behavior: "smooth"
  })
}
```

### Module and Component Names

Use clear, descriptive names that follow the project's naming conventions.

For JavaScript files, prefer lowercase snake_case.

Correct:

```text
about_tech_stack.js
experience.js
experience_impact_metrics.js
navbar.js
```

Functions should use lowercase snake_case:

```js
function initialize_about() {}
function initialize_experience() {}
function initialize_navbar() {}
```

---

## File Responsibility

Each major section must have its own file.

Do not create a single file containing:

- About
- Experience
- Projects
- Resume
- Contact

Each section must remain independently maintainable.

The main file should only compose/import sections and manage application-level behavior.

Example:

```js
import { initialize_about } from "./sections/about/about.js"
import { initialize_about_tech_stack } from "./sections/about/about_tech_stack.js"
import { initialize_experience } from "./sections/experience/experience.js"
import { initialize_experience_impact_metrics } from "./sections/experience/experience_impact_metrics.js"
import { initialize_projects } from "./sections/projects/projects.js"
import { initialize_resume } from "./sections/resume/resume.js"
import { initialize_contact } from "./sections/contact/contact.js"
```

---

## Shared Components

Create shared components only when they are actually reused.

Good candidates:

- Navbar
- Section heading
- Metric card
- CTA button
- Social icon group
- Project card
- Experience card

Do not over-engineer the component hierarchy.

Prefer:

```text
simple
predictable
modular
maintainable
```

over excessive abstraction.

---

## Styling Rules

Follow the reference UI exactly.

When implementing styling:

- preserve reference spacing
- preserve reference width relationships
- preserve reference alignment
- preserve typography hierarchy
- preserve border radius
- preserve card dimensions
- preserve section composition
- preserve intended whitespace
- preserve visual density

Avoid inline styles unless necessary.

Prefer dedicated CSS files or the styling system already present in the repository.

Do not add Tailwind, styled-components, Material UI, Chakra UI, Bootstrap, or another design system unless it already exists or the user explicitly requests it.

---

## Responsive Design

The website must work on:

- desktop
- tablet
- mobile

Desktop should match the reference image most closely.

For smaller devices, preserve the original design language while adapting layout responsibly.

Do not simply scale the desktop page down.

Typical adaptations may include:

- stacked columns
- reduced padding
- smaller typography
- collapsed navigation
- card wrapping
- adjusted section heights

Do not change the conceptual layout more than necessary.

---

## Navigation

The website is a single-page portfolio.

Navigation items should scroll/navigate to the corresponding section:

```text
About
Experience
Projects
Resume
Contact
```

Use section IDs such as:

```text
about
experience
projects
resume
contact
```

Implement smooth navigation without introducing unnecessary routing.

---

## Verification Folder

The `verification/` folder contains the material/page used to validate the implementation.

After implementing a section:

1. Run the application.
2. Compare the rendered section with its corresponding reference.
3. Use the verification material/process in `verification/`.
4. Check visual differences.
5. Correct mismatches before considering the section complete.

Pay special attention to:

- vertical positioning
- horizontal positioning
- section dimensions
- card dimensions
- typography
- font weight
- font size
- line height
- spacing
- alignment
- colors
- border radius
- borders
- shadows
- element visibility
- responsive behavior

Do not declare a UI task complete simply because it renders without errors.

Visual accuracy is part of correctness.

---

## Post-Deploy Verification

After every deploy to GitHub Pages, run the automated deploy check:

```bash
./verification/check_deploy.sh
```

This script checks the live site (`https://varshasathiskumar.github.io`) with 10 test cases:

1. Homepage reachable (HTTP 200)
2. Correct page served (title tag present)
3. All required section anchors present (about, tech-stack, experience, impact-metrics, projects, resume, contact)
4. Navbar mount point present
5. Main JS bundle reachable
6. All linked stylesheets reachable
7. Resume PDF reachable with correct content type
8. Company logo images reachable
9. Tech stack icon images reachable
10. No leftover placeholder content (lorem, placeholder, todo, xxxx)

Each check prints `[PASS]` or `[FAIL]`, and the script exits non-zero if anything fails. To point it at a different URL for debugging, pass it as an argument: `./verification/check_deploy.sh https://example.com`.

Do not consider a deploy verified until this script reports 10/10 passed.

---

## Verification Checklist

Before completing any UI implementation, verify:

- [ ] Correct reference image was used.
- [ ] Section order matches the architecture.
- [ ] Layout closely matches the reference.
- [ ] Typography closely matches the reference.
- [ ] Spacing closely matches the reference.
- [ ] Colors closely match the reference.
- [ ] Cards/components have correct proportions.
- [ ] No invented user content was added.
- [ ] Missing content was left as placeholder or requested from the user.
- [ ] Desktop layout matches the reference.
- [ ] Tablet/mobile layouts remain usable.
- [ ] No unnecessary libraries were introduced.
- [ ] Section exists in its own module/file.
- [ ] Application remains modular monolithic.
- [ ] Naming conventions are followed.
- [ ] No console errors are present.
- [ ] The verification page/process passes.

---

## Git and GitHub Rules

When committing changes to GitHub:

### Author

Use **only the Git/GitHub identity currently configured in the environment**.

Do not modify Git author information unless explicitly requested.

### Claude Co-Authoring Is Forbidden

Never add Claude as:

- co-author
- author
- contributor trailer
- generated-by identity

Do not add commit trailers such as:

```text
Co-Authored-By: Claude ...
```

or:

```text
Generated-By: Claude
```

or any equivalent attribution.

Do not mention Claude in the commit metadata.

The commit author must remain the currently logged-in/configured GitHub user.

### Commit Messages

Use concise descriptive commit messages.

Examples:

```text
built about section
added experience impact metrics
implemented projects section
matched contact section to reference
fixed responsive portfolio layout
```

Do not include AI attribution in commit messages.

---

### Pull Request Name

Write a concise, human-readable pull request title that clearly summarizes the main change or implementation.

Keep the title:
- Short and descriptive
- Focused on what was implemented
- Easy to understand at a glance
- Free of AI or Claude attribution

Examples:
- Built About and Impact Metrics sections
- Implemented Experience section
- Added responsive portfolio layout
- Matched Projects section to reference design
- Fixed mobile layout issues

### Pull Request Description

Write a concise, human-written explanation of what was implemented.

Keep the description:
- Short and easy to scan
- Focused on meaningful changes
- Written naturally, not like generated documentation
- Free of unnecessary implementation details
- Free of AI attribution
- Donot log the details of the converstation with the user
- Only mention what was implemented.
- Never add "🤖 Generated with Claude Code" footer to PR descriptions

Use this format:

## What was implemented

Briefly explain what was added, changed, or fixed.

## Key changes

- Main change
- Important supporting change
- Relevant UI, functionality, or responsive improvement

## Git Safety

Do not:

- force push unless explicitly requested
- rewrite Git history unless explicitly requested
- change configured Git identity
- commit secrets
- commit `.env` files containing credentials
- delete unrelated user work
- reset unrelated modifications

Before committing, inspect the files being included and avoid unrelated changes.

---

## Working With Existing Code

Before making changes:

1. Inspect the current project structure.
2. Inspect `package.json` if present.
3. Inspect existing source files.
4. Inspect `reference/`.
5. Inspect `verification/`.
6. Preserve useful existing architecture and dependencies.
7. Modify only what is required for the requested task.

Do not rebuild the entire project from scratch when a targeted change is sufficient.

---

## Implementation Workflow

For each section, use this workflow:

```text
1. Inspect repository
2. Inspect matching reference image
3. Identify required content
4. Ask user for missing personal information
5. Implement section in its own module
6. Connect it through the main application
7. Match styling to reference
8. Run application
9. Verify against reference
10. Fix visual differences
11. Check responsive behavior
12. Check console/build errors
13. Commit only when requested
```

---

## Handling Missing Information

If a reference contains content that is clearly user-specific and the user has not supplied it, stop before inventing content.

Ask a focused question such as:

```text
The About reference includes:
- headline
- short introduction
- location
- CTA text

Please provide the exact content you want for those fields.
```

---

## Do Not Guess

When uncertain about:

- which reference corresponds to a section
- the exact text the user wants
- whether a statistic is accurate
- which resume file should be linked
- which project should be displayed
- which social profile should be used

do not guess.

Use existing repository information only when it is clearly authoritative; otherwise ask the user.

---

## Code Quality

Code should be:

- readable
- concise
- modular
- maintainable
- consistent with the existing repository

Avoid:

- unnecessarily complex abstractions
- premature optimization
- duplicate components
- giant JavaScript files
- excessive comments
- unused imports
- dead CSS
- debug logs
- hard-coded personal information that has not been provided

---

## Accessibility

Maintain reasonable accessibility without altering the reference design.

Include where appropriate:

- semantic HTML
- descriptive `alt` text
- keyboard-accessible navigation
- visible focus behavior
- buttons for actions
- anchors for navigation links
- sufficient contrast
- meaningful heading hierarchy

Do not compromise the approved design unnecessarily.

---

## Performance

Keep the portfolio lightweight.

Prefer:

- optimized local assets
- lazy loading for large images when useful
- minimal dependencies
- reusable modules/components
- clean CSS
- efficient DOM manipulation

Do not introduce backend services unless explicitly requested.

---

## Section Completion Criteria

A section is complete only when:

1. The correct reference has been followed.
2. Layout visually matches the reference.
3. Required user content is populated only from information supplied by the user.
4. Missing information remains clearly unresolved rather than invented.
5. The section is modular.
6. The section is connected through the main application.
7. The application runs successfully.
8. There are no relevant console errors.
9. Responsive behavior is acceptable.
10. Verification against the provided verification material has been performed.

---

## Priority Order

When instructions conflict, use this priority within the project:

1. Explicit latest instruction from the user
2. This `CLAUDE.md`
3. Approved files in `reference/`
4. Existing repository conventions
5. General implementation preferences

For visual decisions, the approved reference image is the primary source of truth unless the user explicitly requests a design change.

---

## Final Rule

Build the portfolio as a **modular monolith** with each portfolio section isolated into its own file/module and composed through the main application.

Match the approved reference UI as exactly as technically practical.

Never invent personal portfolio content.

When content is missing, ask the user.

When committing to GitHub, use only the currently configured Git/GitHub author and **never add Claude as a co-author or attribution**.