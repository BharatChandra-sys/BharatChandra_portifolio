![Thumbnail](images/Thumbnail.png)

# Bharat Chandra — Portfolio Website

A world-class personal portfolio for **Bharat Chandra**, AI/ML Engineer and final-year CSE student at GITAM University Hyderabad. Built with Next.js, Tailwind CSS, and Framer Motion.

🌐 Live: [bharatchandra.me](https://bharatchandra.me)

---

## Features

- Dark mode by default
- Smooth scroll animations (Framer Motion)
- Fully responsive (mobile + tablet + desktop)
- GitHub API — repo cards fetched on the server and refreshed hourly
- Full SEO: meta tags, JSON-LD structured data, sitemap, robots.txt
- Contact form via Brevo, with rate limiting and spam protection
- Sections: Hero → Featured Projects → Experience → Open Source → Skills → About → FAQ → Contact

## Tech Stack

- **Framework:** Next.js 15
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Email:** Brevo
- **Icons:** React Icons

## Getting Started

1. Clone the repo:
   ```bash
   git clone https://github.com/BharatChandra-sys/BharatChandra_portifolio.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env.local` and fill in your values.

4. Run dev server:
   ```bash
   npm run dev
   ```

## Scripts

- `npm test` — unit tests
- `npm run lint` — ESLint
- `npm run analyze` — bundle size report

Blog post metadata lives in `lib/posts.mjs`. Add new posts there and the blog index, RSS, Atom, sitemap and IndexNow all pick them up. Also add new posts to `app/blog-index-schema.js` (`npm test` checks this).

## Portfolio (static HTML version)

The `portfolio/` folder contains a pure HTML + CSS + Vanilla JS version of the site — zero frameworks, zero build step. Deploy directly to GitHub Pages or any static host.

## Contact

- Email: [bc833498@gmail.com](mailto:bc833498@gmail.com)
- GitHub: [github.com/BharatChandra-sys](https://github.com/BharatChandra-sys)
- LinkedIn: [linkedin.com/in/bharat-chandra-bodapati](https://linkedin.com/in/bharat-chandra-bodapati)
