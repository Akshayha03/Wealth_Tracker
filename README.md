# ⚡ NexusFi — Next-Gen Personal Wealth & Cashflow OS

<div align="center">

![Angular 19](https://img.shields.io/badge/Angular-19.0+-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4+-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-4.4+-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Currency](https://img.shields.io/badge/Currency-INR_(₹)-10B981?style=for-the-badge)

**A premium, futuristic, Gen-Z inspired personal finance dashboard built like a state-of-the-art SaaS platform.**

[Features](#-key-features) • [Design Philosophy](#-design-aesthetics) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Usage Guide](#-usage-guide)

</div>

---

## 🌟 Overview

**NexusFi** abandons traditional, boring banking dashboards in favor of a sleek, high-performance financial operating system. Designed with visual inspiration from **Linear, Arc Browser, CRED, Revolut, and Vercel**, NexusFi offers smooth micro-animations, glassmorphic cards, aurora ambient gradients, and reactive cashflow tracking tailored specifically for **Indian Rupee (₹ INR)** management.

---

## ✨ Key Features

### 💎 **Dynamic Cashflow Ledger & Live Balance**
- **Strictly Reactive Math**: Powered by Angular 19 Signals, your Liquid Net Balance is calculated strictly in real-time as `Total Verified Income - Total Spends`. Zero artificial padding or static placeholders.
- **Multi-Category Logging**: Log expenses, income deposits, or transfers with custom write-in categories and Indian payment methods (**UPI, NEFT, Credit Cards**).

### 📈 **Interactive Cashflow Analytics**
- **SaaS Spending Timeline Graph**: Built with Chart.js, featuring glowing neon curves (`#ff007f` magenta & `#06b6d4` cyan) and dashed average benchmark lines.
- **Chronological Intact Plotting**: Every transaction is plotted chronologically without arbitrary splitting across timestamps.
- **Granular Timeframe Filtering**: Switch seamlessly between **Daily, Weekly, Monthly, Quarterly, Half-Yearly, and Yearly** cashflow views.
- **Indian Locale Formatting (`en-IN`)**: Full support for Indian numbering formats (e.g., `₹ 1,50,000`) across chart axes and hover tooltips.

### 📥 **Instant Report Generation**
- **One-Click CSV Export**: Download your complete financial history directly from the Cashflow Analytics dashboard as a clean spreadsheet (`NexusFi_Wealth_Report.csv`).

### 🎯 **Smart Budget Allocations**
- **Real-Time Health Monitoring**: Track category-wise budget thresholds (Food & Dining, Shopping, Transportation) with color-coded health indicators (`Optimal`, `Warning`, `Exceeded`).

---

## 🎨 Design Aesthetics

NexusFi is engineered to provide a visual *WOW* factor from the first glance:
- **Dark Mode Native**: Deep obsidian backgrounds (`#080a18`) contrasted with electric purple, cyan, pink, and orange neon accents.
- **Glassmorphism**: Soft glowing cards utilizing backdrop blurring (`backdrop-blur-2xl`) and subtle 1px white/10 borders.
- **Ambient Aurora Gradients**: Smooth animated background aurora blobs that breathe life into the UI.
- **Modern Typography**: Styled using crisp Sans-Serif fonts (`Plus Jakarta Sans` and `Space Grotesk`).

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **Angular 19** | Core frontend framework (Standalone Components & Reactive Signals) |
| **TypeScript** | Strongly-typed application logic |
| **Tailwind CSS** | Utility-first styling & custom design tokens |
| **Chart.js** | High-performance HTML5 canvas data visualizations |
| **HTML5 & Vanilla CSS** | Custom aurora animations, glass panels, and responsive grid layouts |

---

## 🚀 Getting Started

### Prerequisites
Make sure you have **Node.js (v18+)** and **npm** installed on your machine.

### Installation

1. **Clone the repository or open the project folder:**
   ```bash
   cd Expense-Tracker
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   # OR
   ng serve
   ```

4. **Open your browser:**
   Navigate to **`http://localhost:4200/`** to view the application.

---

## 📖 Usage Guide

1. **Onboarding**:
   - Enter your name and verified monthly income (in **₹ INR**).
   - Select your preferred persona avatar to initialize your live dashboard.

2. **Logging a Transaction**:
   - Click the glowing **"Log Transaction"** button in the header or bottom banner.
   - Choose whether it's an **Expense** or **Income**.
   - Enter the exact amount in ₹, select a category (or type a custom category), choose your UPI/Card payment method, and save.

3. **Analyzing Cashflow**:
   - Navigate to the **Analytics** view via the sidebar or mobile bottom nav.
   - Toggle between **EXPENSE**, **INCOME**, or **BOTH** curves.
   - Click **"Download Report"** at any time to export your cashflow data to CSV.

4. **Resetting Your Profile**:
   - Go to **Settings** and click **"Switch Persona / Reset Profile"** to clear local storage and test a new income bracket.

---

<div align="center">
  <p class="text-sm text-slate-400">Built with precision, vibrant aesthetics, and modern web design standards.</p>
</div>
