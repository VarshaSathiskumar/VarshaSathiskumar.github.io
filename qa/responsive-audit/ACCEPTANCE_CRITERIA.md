# Responsive acceptance criteria

Ground truth for the `/responsive-audit` pipeline (`.claude/skills/responsive-audit/SKILL.md`, agents in `.claude/agents/responsive-*.md`).

- **Desktop (>=1024px, the last CSS breakpoint in the codebase):** diff each section's screenshot against the matching file in `verification/` (`About.png`, `TechStack.png`, `Experience.png`, `ImpactMetrics.png`, `Projects.png`, `Resume.png`, `Contact.png` — real rendered screenshots of the live site, ~1708px logical width at 2x). `reference/` is the original design mockups used to build the site and is **not** used for comparison here. Extra centered whitespace at wider viewports (1280–2560px) is expected, not a bug, since no breakpoint exists above 1024px.
- **Mobile/tablet (<1024px):** there is no screenshot to diff against — CLAUDE.md is explicit that "mobile adaptations are ours to design reasonably... without changing the visual language." Judge against the checklist below, plus:
  - **Design-token consistency:** extract `getComputedStyle()` values (color, font-family/weight, border-color, border-radius, box-shadow) for one instance each of a card, the primary CTA button, an `h1`/`h2`, and the navbar, at the current viewport. Diff against the same extraction at a desktop viewport (already confirmed against `verification/`). Any drift is a fidelity bug even though layout is expected to change.
  - **Baseline regression:** after a viewport first passes, its screenshot is saved to `qa/responsive-audit/baseline/<width>x<height>.png`. Every later `/responsive-audit` run also diffs against that baseline. On the very first run for a viewport, surface the screenshot to the user for sign-off before saving it as the baseline.

## Global invariants (every section, every viewport <1024px)

- No horizontal scroll on `<html>`/`<body>` (`scrollWidth <= innerWidth`). The only allowed horizontal scroll is *inside* the Experience and Projects card rails — intentional at every width.
- No element's bounding box extends past the viewport's left/right edge, except a section's full-bleed background (e.g. Contact's dark background may span edge-to-edge; the content inside it must not).
- No unintended overlap between sibling elements. Exception: the About photo's offset drop-shadow is a deliberate design element — judge by screenshot, don't flag it as a scripted overlap.
- Every `<img>` has loaded (`naturalWidth > 0`) and has alt text.
- No fixed-pixel-width block element wider than `viewport width - page padding`.
- No clipped/truncated text — headings and paragraphs must fully wrap. Nothing on this site intentionally uses ellipsis-truncation.
- Body text never drops below 14px; headings stay visibly larger than body text at every step.
- Every interactive element (buttons, links, the nav toggle, form fields) has a tappable area >=44x44px.

## Per-component invariants

**Navbar** (`src/components/navbar.js` / `navbar.css`, breakpoint 768px, toggle: `.navbar__toggle`, open state: `.navbar--open` on `.navbar`, menu: `#navbar-menu`)
- Below 768px: collapses to the hamburger toggle. Clicking `.navbar__toggle` must add `.navbar--open` and reveal all 5 links (About/Experience/Projects/Resume/Contact) inside `#navbar-menu`, each `[data-nav-link]` scrolling to its `section_id` on click.
- Above 768px: full horizontal link row, no hamburger.
- `.navbar__wordmark` and `.navbar__badge` ("OPEN TO WORK") stay visible and unclipped in both states.

**About** (`src/sections/about/about.css`, breakpoints 640/960/1024px)
- Below 640px: the two-column hero (name/intro/stat cards/CTA + photo) stacks to one column in a sensible reading order — the photo must not interrupt the intro paragraph mid-flow.
- The 3 stat cards stack or wrap without becoming unreadably narrow.
- The CTA button and GitHub/LinkedIn icon buttons stay >=44x44px.

**Tech Stack** (part of About)
- The desktop 9-column icon grid reflows to fewer columns as width shrinks, never below 2 columns; each box stays square with its label fully legible, not wrapped mid-word.

**Experience + Impact Metrics** (`src/sections/experience/experience.css`, breakpoint 960px — regression guard for commit `4f801dc`)
- The Impact Metrics label bar must never squeeze the stat/title text into single-character-per-line wrapping or invisible overflow. Explicitly re-check this exact regression at and around 960px on every run.
- Impact Metrics' desktop 2+3 card grid reflows to 1 (or a clean 2) column below 960px.
- The Experience card rail keeps its horizontal scroll and "SCROLL SIDEWAYS" hint at every width, without ever forcing page-level horizontal scroll.

**Projects** (`src/sections/projects/projects.css`)
- The WORK/PERSONAL toggle stays visible, tappable, and shows the correct active state at every width.
- The project card rail follows the same horizontal-scroll rule as Experience.

**Resume** (`src/sections/resume/resume.css`)
- Download/View-in-Browser buttons stack or sit side-by-side without overlapping, staying tappable.
- The decorative document-preview graphic scales down or hides gracefully rather than overflowing.

**Contact** (`src/sections/contact/contact.css`, breakpoint 640px)
- Below 640px: the info column and form column stack to one column; form fields, labels, and the TRANSMIT_MESSAGE button stay full-width and usable.
- Email/LinkedIn/GitHub links stay tappable, text not cut off.

---
This file is authored once and amended by hand as sections or components change — it is not regenerated per pipeline run.
