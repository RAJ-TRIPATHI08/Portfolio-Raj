# 🚀 Developer Portfolio

A modern, highly interactive, and visually stunning developer portfolio built with **Next.js**, **React 19**, **Tailwind CSS**, and **Framer Motion**. It features live dashboard stats fetched dynamically from platforms like LeetCode, Codeforces, and GeeksforGeeks.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Library:** [React](https://react.dev/) (v19)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)

---

## ⚙️ Running Locally

Follow these steps to run the portfolio on your local machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/RAJ-TRIPATHI08/Portfolio-Raj.git
   cd Portfolio-Raj
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the site.

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 🌐 Deployment Options

Here are the best ways to deploy this portfolio website:

### Option 1: Vercel (Highly Recommended & Easiest)

Vercel is the creator of Next.js and offers the most seamless deployment experience.

1. Sign up or log in at [Vercel](https://vercel.com).
2. Click **Add New** > **Project**.
3. Import your GitHub repository: `RAJ-TRIPATHI08/Portfolio-Raj`.
4. Vercel automatically detects Next.js and configures the build setup.
5. Click **Deploy**.
6. Any future commits pushed to the `main` branch will automatically trigger a new deployment.

---

### Option 2: GitHub Pages (Static HTML Export)

Since the website fetches stats dynamically on the client side, it can be exported as a static site and hosted for free on GitHub Pages.

#### 1. Configure Next.js for Static Export
Open your `next.config.ts` (or `next.config.js`) and modify it to enable static exports:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",      // Enables static HTML export
  images: {
    unoptimized: true,   // Required for static export
  },
};

export default nextConfig;
```

#### 2. Configure GitHub Pages Deployment
The easiest way is to use a GitHub Action to deploy automatically on every push:

1. Create a file at `.github/workflows/deploy.yml`.
2. Add the following configuration:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-node-version: '20'
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build with Next.js
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

3. Push the changes to GitHub.
4. Go to your repository on GitHub, click **Settings** > **Pages**.
5. Under **Build and deployment** -> **Source**, select **GitHub Actions**.

---

### Option 3: Netlify

Netlify is another excellent platform for hosting Next.js applications.

1. Log in to [Netlify](https://www.netlify.com).
2. Click **Add new site** > **Import an existing project**.
3. Link your GitHub account and select the `Portfolio-Raj` repository.
4. Netlify will auto-detect the build configuration:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next` (or `./out` if static export is configured)
5. Click **Deploy**.
