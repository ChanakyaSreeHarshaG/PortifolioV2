# 🚀 Data Engineering & Analytics Learning Hub (Next.js & Vercel Edition)

A modern, high-performance web application built with **Next.js 16 (App Router)**, **TypeScript**, and **Tailwind CSS**. Designed for instant deployment on **Vercel** and **GitHub Pages**.

---

## 🌟 What's Included

1. **⚡ Spark & Databricks 7-Week Roadmap (`/` or `/guides/databricks-spark-roadmap`)**
   - High-fidelity interactive roadmap design.
   - 7 structured weeks across all 5 Databricks Associate exam domains.
   - 10 curated free YouTube video cards with high-definition thumbnails and direct links.
   - Glassmorphic styling with ambient blur orbs and responsive mobile-first grid.

2. **📊 Power BI & DAX 6-Week Master Roadmap (`/powerbi-roadmap` or `/guides/powerbi-roadmap`)**
   - Structured 6-week curriculum tailored for the **Microsoft PL-300: Power BI Data Analyst** certification.
   - Comprehensive phases: Power Query (M code), Star Schema modeling, VertiPaq engine, Row Context vs Filter Context, Advanced DAX (Time Intelligence, YoY growth, semi-additive measures), Dynamic Row-Level Security (RLS) with `USERPRINCIPALNAME()`, Performance Analyzer, DAX Studio, and Incremental Refresh.
   - **Scenario-based interview-level questions & solutions** for every phase with interactive accordions.

3. **💡 174+ Company SQL Interview Master Archive (`/sql-interview-master` or `/guides/sql-interview-master`)**
   - **174 real SQL interview questions** extracted across 9 tech companies:
     - Capgemini (25)
     - Deloitte (9)
     - Infosys (21)
     - Cognizant (18)
     - Saama Technologies (19)
     - NTT DATA (29)
     - LTIMindtree (7)
     - Accenture (5)
     - Grid Dynamics (41)
   - **50 Solved query problems** with runnable SQL code snippets, expected output tables, and interview pro-tips.
   - **8 Core live-coding pattern cheat sheet** (Nth highest value, Top-N per group, finding/deleting duplicates, running totals, gaps & islands, row-over-row `LAG()`, sessionization).
   - Real-time search by keyword and company filter tags.

4. **📚 200 Core Data Engineering Vocabulary Terms (`/de-vocabulary` or `/guides/de-vocabulary`)**
   - Complete reference of 200 core terms and architectures.
   - Clear definitions and practical real-world production use cases.
   - Categorized across 12 domains: Spark & Distributed Systems, Storage & Performance, Streaming & Kafka, ETL & Airflow, Data Governance & Quality, and SQL/ACID.
   - Instant live search and category chips.

5. **📖 Supplementary Guides (`/guides/`)**
   - `/guides/databricks-vs-snowflake` — Interactive platform comparison with role-picker and architecture breakdowns.
   - `/guides/sql-patterns` — 8 SQL patterns cheat sheet.
   - `/guides/learn-python` — 5 curated free Python resources and project repositories.

6. **🌓 Dark / Light Theme**
   - Persistent theme switcher that syncs with system preference and saves to `localStorage`.

---

## 🚀 How to Host on Vercel (Step-by-Step)

You have two convenient options to deploy this application to Vercel:

---

### Option A: Deploy as a Standalone Roadmap Website (Recommended)

To give this roadmap hub its own dedicated repository and Vercel domain (e.g. `https://my-roadmaps.vercel.app`):

#### 1. Push to a New GitHub Repository
Open PowerShell or your terminal and navigate into the `databricks-spark-roadmap` folder:

```bash
cd "d:\New Beginning\portfolio\databricks-spark-roadmap"

# Initialize git repository
git init

# Stage all files
git add .

# Commit
git commit -m "feat: complete data engineering & power bi next.js hub"

# Set branch to main
git branch -M main

# Link to your new GitHub repository (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_ROADMAP_REPO.git

# Push to GitHub
git push -u origin main
```

#### 2. Deploy on Vercel Dashboard in 3 Clicks
1. Go to [vercel.com/new](https://vercel.com/new) and log in with your GitHub account.
2. Under **Import Git Repository**, find your new repository and click **Import**.
3. Leave all Build & Output Settings as default (Vercel automatically detects Next.js).
4. Click **Deploy**.
5. Within 45 seconds, your site is live with global edge caching and free SSL! 🎉

---

### Option B: Deploy Through Your Existing Portfolio Repository

Because all routes are also integrated into your main portfolio at `app/guides/`:

1. Commit and push your existing portfolio repository (`ChanakyaSreeHarshaG/PortifolioV2`):
   ```bash
   cd "d:\New Beginning\portfolio"
   git add .
   git commit -m "feat: add data engineering and power bi roadmap suite"
   git push origin main
   ```
2. In Vercel, connect your portfolio repository.
3. Once deployed, the entire roadmap ecosystem is live at:
   - `https://your-portfolio.vercel.app/guides/databricks-spark-roadmap`
   - `https://your-portfolio.vercel.app/guides/powerbi-roadmap`
   - `https://your-portfolio.vercel.app/guides/sql-interview-master`
   - `https://your-portfolio.vercel.app/guides/de-vocabulary`
   - `https://your-portfolio.vercel.app/guides/databricks-vs-snowflake`
   - `https://your-portfolio.vercel.app/guides/sql-patterns`
   - `https://your-portfolio.vercel.app/guides/learn-python`

---

### Option C: Instant Deploy Using Vercel CLI

If you have Node.js installed, you can also deploy directly from your terminal without opening a browser:

```bash
cd "d:\New Beginning\portfolio\databricks-spark-roadmap"

# Run Vercel CLI (zero config)
npx vercel

# For production deployment:
npx vercel --prod
```

---

## 💻 Local Development Setup

To run and preview the Next.js app locally on your machine:

```bash
cd "d:\New Beginning\portfolio\databricks-spark-roadmap"

# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
