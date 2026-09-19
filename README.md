# Varsha Sathiskumar — Portfolio

My personal portfolio site, live at [varshasathiskumar.github.io](https://varshasathiskumar.github.io).

## Built with

Plain HTML, CSS, and JavaScript — no framework, no build step. The site is organized as a modular monolith, with each page section implemented as its own component and composed through one main entry point (`src/main.js`).

The whole thing was built by driving the **Claude Code** harness.

## Sections

- About
- Experience
- Projects
- Resume
- Contact

## AI Voice Agent

The portrait bubble on the About section opens a voice agent visitors can talk to about my experience, projects, and background. It's built on the OpenAI Realtime API for live voice conversation, backed by a small retrieval (RAG) service that grounds its answers in my resume and portfolio content. The backend is hosted separately from this static site, since GitHub Pages only serves static files — code at [personal-voice-ai-agent](https://github.com/VarshaSathiskumar/personal-voice-ai-agent).

