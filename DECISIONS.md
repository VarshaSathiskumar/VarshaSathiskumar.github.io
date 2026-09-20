# Decision log

## 1. What did you set out to build, and what changed?

What you wanted at the start, and what is actually live now.
Name one thing you dropped or added along the way, and why.

At the start of the project, I set out to build a personal portfolio website based on the UI mockups I had designed. I was able to implement the planned UI closely, including the main sections, layouts, and responsive behavior.

One idea I added along the way was a live AI voice agent that visitors could use to ask questions about my background, experience, and projects. I was able to implement the voice agent and connect it to my portfolio information. My original idea was to also clone my own voice so the agent would sound like me. However, I dropped that part because I could not find a free platform that supported both voice cloning and the integration I needed. The final version therefore includes the AI voice agent, but uses a standard voice instead of my cloned voice.

---

## 2. A fork in the road

Name one real choice where you could have gone two ways.
Plain HTML or a framework. One page or several. Your own CSS or someone's template.
What goes on the front page and what does not.

Say which you picked, what the alternative was, and what you gave up by not taking it.

"There was no alternative" is not an answer. Find the fork.

One major choice I made was sticking strictly with HTML, CSS, and JavaScript instead of using a framework like React. Since the portfolio is relatively simple and does not require much scalability, I wanted to keep the architecture lightweight. For the visual design, I took inspiration from multiple portfolios online and created the UI mockups using Claude code Design.

For the contact section, instead of opening the user’s email client, which may behave differently across devices, I integrated Formspree to handle messages directly through the website.

For the voice agent, I chose to keep the backend separate from the portfolio repository. GitHub Pages only supports static hosting, and keeping the voice agent standalone also gives me more flexibility to improve and scale it independently. The alternative was to build and deploy everything together. By separating them, I gave up a single codebase and deployment, but kept the main portfolio simple and static.

---

## 3. Where you overruled the agent

One time Claude suggested, wrote, or claimed something and you did not take it.

What did it do? How did you notice? What did you do instead?

If it genuinely never happened, say so plainly, and then say what you would have had to
check in order to notice. Being honest here costs you far less than a story you cannot
defend when you record your video.

One place I overruled Claude was while testing the website’s responsiveness. Claude initially reported that the site was responsive across desktop, tablet, and mobile dimensions, but when I manually tested different viewport sizes, I found layout issues at specific breakpoints. I had to identify the exact dimensions and point out the issues before Claude corrected them.

I also noticed that Claude sometimes added its own design choices even when I asked it to follow the UI mockups exactly. For example, it created buttons with rounded corners when the mockup had sharp edges. Instead of accepting those changes, I compared the implementation against my mockups and explicitly directed Claude to match the exact button designs.

---

## 4. How you know it works

What check did you run, and what did it tell you?

Then the real question: **what would have made this check fail?**
A check that could not have failed is not a check.

Link to your `verification/` folder.

I created a verification/ folder containing a screenshot of the deployed portfolio, fetch.txt with the fetched live-site response, a README.md documenting the verification process, and check_deploy.sh for automated post-deployment verification.

I ran check_deploy.sh against the live site. It runs 10 checks covering the homepage response, expected page content and sections, JavaScript and stylesheets, resume PDF, company logos, tech-stack icons, and leftover placeholder content. All 10 checks passed.

The check would fail if any of these conditions were broken. For example, if the site did not return HTTP 200, a required section was missing, an asset returned an error, or placeholder content remained. If any test fails, the script reports the failure and exits with status 1.

I also added instructions to CLAUDE.md to run this verification after deployment.

---

## 5. What is still wrong

One thing on your own site that is not right, not finished, or that you do not
fully understand.

What would you do next, and how would you find out?

One thing that is still in progress is my multi-agent workflow for automated responsiveness testing. My goal was to have an orchestrator use Playwright to capture screenshots across different viewport sizes, a reviewer agent identify UI issues, and a coding agent fix them before sending the changes back for review.

The main issue is that the reviewer does not yet have a reliable reference for what each viewport should look like, so it cannot consistently verify whether the UI is correct. My next step is to define reference screenshots and clear acceptance criteria for each viewport size, then test the workflow against known UI issues. Eventually, I want to make this reusable across other websites I build.
