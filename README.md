# Robotics & Engineering Portfolio

A personal and academic portfolio website in a **Swiss / International Typographic** style, optimized for **GitHub Pages**.

---

## Features

* **Cyber-Tech UI:** Neon outlines, digital grid background and a live Telemetry Terminal panel.
* **Bilingual (EN / DE):** Language selector in the navigation bar. English is the default; the choice is persisted via `localStorage`.
* **Dark / Light theme:** Dark Cyber by default, with a Light Lab mode.
* **Instant search (Ctrl + K):** Real-time site-wide search modal (English and German).
* **100% GitHub Pages compatible:** Includes `.nojekyll`; works out of the box with no Ruby or Node.js setup.

---

## Project structure

```text
vinhdo281.github.io/
├── index.html            # Home: intro, Telemetry Terminal, highlights
├── research.html         # Studies and simulations without a shipped product
├── portfolio.html        # Finished projects + interactive category filter
├── blog.html             # Technical articles & engineering notes
├── cv.html               # Education, awards & skill matrix
├── posts/                # Full blog articles
├── .nojekyll             # Bypass config for GitHub Pages
├── assets/
│   ├── css/style.css     # All Cyber-Tech styling & responsive rules
│   ├── js/
│   │   ├── main.js            # Language, theme, search, BibTeX toast
│   │   ├── search-data.js     # Ctrl+K search index
│   │   ├── projects-data.js   # Project detail data
│   │   └── projects-modal.js  # Project filter & modal controller
│   └── images/
└── README.md
```

---

## Deploying to GitHub Pages

1. Create a **public** repository named `<username>.github.io`.
2. Push the source:
   ```powershell
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<username>/<username>.github.io.git
   git push -u origin main
   ```
3. In the repo go to **Settings** → **Pages**, choose `Deploy from a branch`, then branch `main` / `/(root)`.
4. Visit `https://<username>.github.io`.

---

## Admin visual editor

Footer **Admin** -> **Đăng nhập với GitHub** opens GitHub's token page (pre-filled); create the
token with access to this repo only and *Contents: Read and write*, paste it, then turn on edit mode
and **Save** (commits to `main`). Code: `assets/js/admin.js`, `assets/css/admin.css`.
