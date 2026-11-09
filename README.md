# Aryan Rawat — Portfolio

A React portfolio with a portrait-led intro, screenshot-led projects, and a concise overview of experience, skills, and education.

```sh
npm ci
npm start
```

Open [http://localhost:3000/Portfolio/](http://localhost:3000/Portfolio/).

```sh
npm test -- --watchAll=false --runInBand
npm run build
```

- Portfolio data: `src/data/portfolio.js`
- The six chapters alternate between two backgrounds in both themes.
- Project previews: open an original screenshot with a click or Enter, and dismiss with Escape.
- Motion: GSAP ScrollTrigger and Lenis respect reduced motion and the header pause control.

The existing GitHub Pages workflow builds from `main`. The site uses anchor navigation and the `/Portfolio/` base path; it does not require server rewrites.
