# Md Shahid Jamal — Portfolio

React + Tailwind CSS personal portfolio, built with Vite.

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build

```bash
npm run build
```

## Structure

```
src/
  App.jsx                 - assembles all sections
  components/
    Navbar.jsx
    Hero.jsx
    StatsBar.jsx
    AboutMe.jsx
    Projects.jsx
    SkillsExperience.jsx  - wraps TechStack, Timeline, BeyondCode in 3 columns
    TechStack.jsx
    Timeline.jsx
    BeyondCode.jsx
    CTA.jsx
    Footer.jsx
```

## Quick start: edit `src/data.js`

Your email, social links, resume path, photo path and the 4 featured projects
(live demo link, GitHub link, impact line) are all in `src/data.js`. Everything
marked `DUMMY` is a placeholder. Also replace `public/photo.jpg` and
`public/resume.pdf` with your real files.

## Achievements gallery

Put your achievement photo in `public/achievements/` and add one line to
`ACHIEVEMENTS` in `src/data.js` (title, org, year, category, image). Visitors
can filter by category and open any image full screen. Tip: keep 4-8 real,
clear images (JPG/WebP under 300 KB each).

## Certificates & Appreciation Section

You have a dedicated section for Certificates and Letters of Appreciation:
1. **Via the Website UI**: Click the `+ Upload Appreciation / Certificate` button directly in the section to preview and upload an image right in your browser (saved in `localStorage` so it stays on refresh).
2. **Permanent Addition in Code**:
   - Save your image to `public/appreciation/` or `public/certificates/`
   - Add an entry to `CERTIFICATES_APPRECIATIONS` in `src/data.js` (you can also click "Copy code for data.js" in the upload modal).

## Customizing content

Each component holds its own data as a small array/object near the top of the
file (e.g. `PROJECTS` in `Projects.jsx`, `TIMELINE` in `Timeline.jsx`,
`SKILLS` in `Hero.jsx`). Edit those directly to swap in your own text, links,
and numbers — no need to touch the JSX layout below them.

## Assets to replace

- `public/placeholder.jpg` — swap for your real portrait / project
  screenshots (referenced directly as `/placeholder.jpg` in several
  components — replace the file or update the `src` paths).
- `/resume.pdf` — add your resume PDF to `public/` for the "Download Resume"
  button to work.
- Social links in `Hero.jsx` (`SOCIALS` array) — update with your real
  GitHub / LinkedIn / X / Instagram URLs.
- `mailto:` link in `CTA.jsx` — update to your real email.

## Notes

- Colors, fonts (Poppins/Inter/Caveat) and the pill/rounded-corner style are
  configured in `tailwind.config.js` and `index.html`.
- Icons come from `lucide-react`.
- The dark-mode toggle in the navbar is UI-only (no theme logic wired up yet),
  as specified in the brief.
