# Liam Jackson | Portfolio

My personal portfolio website, built to showcase my projects, education, and services as a software engineering student and freelance web developer.

**Live site:** https://liamj7705.github.io/ <!-- update if your URL is different -->

## Pages

- **Home**: welcome message, mission statement, and quick links
- **About Me**: photo, short bio, and a PDF copy of my resume
- **Projects**: client, personal, and school projects with category filters
- **Education**: timeline of my qualifications, completed and in progress
- **Services**: the web development services I offer
- **Contact**: contact details and a working message form

## Built With

- [React](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) for development and builds
- [React Router](https://reactrouter.com/) for page navigation
- Plain CSS with custom properties for theming (light and dark mode)
- [Formspree](https://formspree.io/) for the contact form
- GitHub Pages for hosting

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or newer)
- npm (included with Node.js)

### Installation

```bash
git clone https://github.com/liamj7705/Liam_Jackson_Portfolio.git
cd Liam_Jackson_Portfolio
npm install
```

### Run locally

```bash
npm run dev
```

Then open the address shown in the terminal (usually `http://localhost:5173`).

### Build for production

```bash
npm run build
npm run preview
```

## Project Structure

```
public/
  Liam_Jackson_Resume.pdf   resume linked from the About page
  favicon.png               site icon
src/
  assets/                   images (logo, profile photo, project screenshots)
  components/               Navbar, Footer, ProjectCard, ScrollToTop
  data/                     projects.ts, education.ts, services.ts
  pages/                    Home, About, Projects, Education, Services, Contact
  App.tsx                   layout and routes
  index.css                 global styles and color variables
  main.tsx                  app entry point
```

## Updating Content

Most content lives in the `src/data/` folder, so you can update the site without touching the page layouts:

- **Add a project:** add an object to `src/data/projects.ts`
- **Add a qualification:** add an object to `src/data/education.ts`
- **Add or edit a service:** edit `src/data/services.ts`
- **Replace the resume:** swap the PDF in `public/`, keeping the same file name

## Contact Form Setup

The contact form sends messages through Formspree. To use your own form:

1. Create a free form at [formspree.io](https://formspree.io/).
2. Copy your form ID.
3. In `src/pages/Contact.tsx`, replace the ID in the `FORM_URL` constant.

## Deployment

The site is deployed to GitHub Pages. To publish updates:

```bash
npm run deploy
```

If the site is hosted under a sub-path (for example `/Liam_Jackson_Portfolio/`), set the matching `base` value in `vite.config.ts`.

## Author

**Liam Jackson**

- GitHub: [@liamj7705](https://github.com/liamj7705)
- LinkedIn: [linkedin.com/in/liam-jackson-842384197](https://linkedin.com/in/liam-jackson-842384197)
- Email: liamjackson047@gmail.com