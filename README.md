# G. Chanakya Sree Harsha — Data Analyst Portfolio

This is a modern, production-grade reconstruction of the [Chanakya Sree Harsha Portfolio](https://chanakyasreeharshag.github.io/) built with **Next.js 14+ (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

## Tech Stack
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Fonts**: `next/font` (Google Fonts: Space Grotesk & Inter)

## Project Structure
- `app/` — Root layout, metadata configuration, FOUC prevention scripts, sitemaps, and main entry page.
- `components/sections/` — Individual sections (Hero, About, Skills, Experience, Projects, Certifications, Education, Contact, Footer).
- `components/ui/` — Modular elements (Navbar, ThemeToggle, Modal details, Lightbox zoom, ParticleCanvas).
- `data/` — Typesafe structured content (skills list, project specifics, experience history, certifications link, and meta details).
- `lib/` — Tailwind utility classes helper (`cn`).
- `public/` — Resume PDFs, screenshots, and visual branding assets.
- `styles/` — Core theme variables, glassmorphic card utilities, custom timelines, scrollbars, and keyframes.

## Local Development Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build Production Bundle
```bash
npm run build
```

---

## Deployment on Vercel

The website is engineered to be fully static, modular, and instantly ready for Vercel deployment.

### Step-by-Step Vercel Deploy:

1. **Push your code to GitHub**:
   Create a new GitHub repository and push this project codebase.
2. **Connect to Vercel**:
   - Log in to your [Vercel Dashboard](https://vercel.com).
   - Click **Add New...** and select **Project**.
   - Import your GitHub repository.
3. **Configure & Deploy**:
   - Next.js is auto-detected. Leave the build settings as default.
   - Click **Deploy**. Vercel will build and launch your site onto a secure live domain!