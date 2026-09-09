# 🚀 FolioCraft — Interactive Portfolio Creator & Web Bundle Generator

**FolioCraft** is a modern, high-performance web application built with **React**, **Vite**, and **Tailwind CSS**. It allows developers, designers, and professionals to build stunning digital portfolios with real-time interactive previews and export them as standalone, production-ready static website packages (HTML, CSS, JS) or PDF documents.

---

## ✨ Features

- 🎨 **6 Distinct Modern Themes**:
  - **Creative Canvas**: Vibrant pink & purple gradients with clean, centered typography.
  - **Dark Tech**: Sleek cyan & slate dark mode tailored for developers and engineers.
  - **Glass Bento**: Modern glassmorphism layout with frosted blur effects.
  - **Minimal Executive**: Elegant slate & serif aesthetic for corporate leaders and managers.
  - **Cyber Matrix**: High-tech green scanline aesthetic with terminal prompt styling.
  - **Neo-Brutalist**: High-contrast, bold black borders with vibrant pop colors.

- ⚡ **Real-Time Live Previewer**:
  - Instant WYSIWYG editing for Hero sections, Bio, Skills, Work Experience, Projects, Education, and Certifications.
  - Interactive skill progress metrics with custom proficiency percentages and labels.

- 📦 **1-Click Static Web Export**:
  - Generates a self-contained `.zip` bundle containing `index.html`, `style.css`, and `script.js`.
  - Zero external JavaScript framework dependencies in the exported bundle — fast, light, and 100% accessible.
  - Built-in scroll animations (`IntersectionObserver`) and full mobile responsiveness out-of-the-box.

- 📄 **Certificate PDF Viewer & Verifier**:
  - Upload certificate PDFs or link external credentials with inline modal previewing and download functionality.

- 💾 **JSON Data Backup & Restore**:
  - Export and import your portfolio data via raw JSON files for easy backups or transfer across devices.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Utilities**: [JSZip](https://stuk.github.io/jszip/), [html2pdf.js](https://html2pdf.com/)

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have **Node.js** (v18+ recommended) installed on your computer.

### 2. Installation
Clone the repository and install project dependencies:

```bash
git clone https://github.com/your-username/FolioCraft.git
cd FolioCraft
npm install
```

### 3. Start Development Server
Run the local Vite development server:

```bash
npm run dev
```

Open your browser at `http://localhost:5173`.

### 4. Build for Production
To generate a production-ready build of the FolioCraft app:

```bash
npm run build
```

The compiled files will be generated inside the `dist/` directory.

---

## 🌐 Deploying Exported Web Bundles

When you export your portfolio using the **Web Bundle (.zip)** option in FolioCraft, you get an unzipped package with `index.html`, `style.css`, and `script.js`. You can host it for free using:

- **GitHub Pages**: Upload the unzipped files to a public repository and enable Pages under `Settings > Pages`.
- **Vercel / Netlify**: Simply drag and drop the unzipped folder into Vercel or Netlify.
- **Traditional Web Host**: Upload `index.html`, `style.css`, and `script.js` directly to your server's `public_html` folder.

---

## 📁 Project Structure

```
FolioCraft/
├── src/
│   ├── components/
│   │   ├── common/         # Brand icons, scroll animations, certificate modals
│   │   ├── editor/         # Tabbed editor forms (Personal, Skills, Projects, etc.)
│   │   └── preview/        # Live preview container and 6 template renderers
│   ├── context/            # PortfolioContext state management
│   ├── utils/              # Export utilities (PDF, ZIP, JSON) & AI engines
│   ├── App.jsx             # Main application layout
│   └── index.css           # Global Tailwind CSS configuration
├── public/                 # Static assets
├── index.html              # Entry HTML file
├── vite.config.js          # Vite build configuration
└── package.json            # Dependencies and scripts
```

---

## 📄 License

This project is open-source and available under the **MIT License**.
