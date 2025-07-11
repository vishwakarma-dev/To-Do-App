# Advanced Responsive To-Do App

A beautifully styled, mobile-responsive To-Do App built using **Next.js**, **TypeScript**, and **Material UI (MUI)**. Features include persistent storage, task filtering, task editing with inline and menu-based controls (mobile), responsive layout, gradient UI, and a custom scrollbar.

---

## 🔧 Features

- ✅ Add, Edit, Delete, and Toggle tasks
- ✅ Task filtering: All / Active / Completed
- ✅ LocalStorage-based persistence
- ✅ Snackbar alerts for user feedback
- ✅ Responsive design (desktop and mobile)
- ✅ Truncated long tasks on mobile with full tooltip
- ✅ 3-dot menu for Edit/Delete on mobile view
- ✅ Custom styled scrollable task list
- ✅ Gradient background & blurred paper layout

---

## 📁 Project Structure

```
/components
  └── TodoItem.tsx    // Reusable to-do item component
/pages
  └── index.tsx       // Main home page
/styles
  └── globals.css     // Custom global styles (scrollbar, etc.)
```

---

## 📦 Technologies

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Material UI](https://mui.com/)
- [LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

---

## 🖥️ Desktop Experience

- Task list with edit and delete buttons inline.
- Full task text displayed.

## 📱 Mobile Experience

- Tasks show only first 50 characters with full tooltip.
- Edit/Delete actions shown via 3-dot vertical menu (`MoreVertIcon`).
- Optimized layout and scrollable task list.

---

## 📜 Custom Scrollbar (Add in `globals.css`)

```css

/* Scrollbar Styling */
* { 
  scrollbar-width: thin;
  scrollbar-color: #9c27b0 #f3e5f5;
}

```

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run in development
npm run dev
```

Open your browser and navigate to: [http://localhost:3000](http://localhost:3000)

---


## 👨‍💻 Author

**Your Name**  
GitHub: [@vishwakarma-dev](https://github.com/vishwakarma-dev)  
Project Repo: [QR-Code-Generator](https://github.com/vishwakarma-dev/To-Do-App.git)