# 📝 Todo App (React)

A simple, clean, and interactive Todo application built with **React**, styled
using **Tailwind CSS**, and data fetching from a remote API using **React
Query** and featuring:

- ✅ Add, edit, delete todos
- 🔍 Search functionality
- 📂 Filter by status (All / Completed / Pending)
- 📦 LocalStorage persistence
- 📄 Paginated views (10 todos per page)

---

## 📌 Features

- ✅ Create, read, update, and delete (CRUD) todos
- 🔁 Edit and save tasks with live updates to local storage
- 🔍 Pagination (10 todos per page)
- 🔄 Fallback to API (`https://jsonplaceholder.typicode.com/todos`) when local
  data is empty
- 💾 Automatic `local storage` sync
- ⏳ Pending task animations/icons (⏳)
- 📶 React Query for asynchronous data fetching
- 🌙 Responsive UI with Tailwind CSS
- 🛠️ Error handling and loading states

---

## 🛠️ Technologies Used

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [FontAwesome](https://fontawesome.com/) (icons)
- [React Query](https://tanstack.com/query/latest) (for fetching todos API)
- [React Router](https://reactrouter.com/) (for routing)

---

### 📥 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sirjaey/AltSchool-Second-Semester-Exam
   cd todo-app
   ```
2. **Install dependencies**
   ```bash
   pnpm install
   ```
3. **Start the development server**
   ```bash
   pnpm run dev
   ```
4. **Build for production**
   ```bash
   pnpm run build
   ```
5. **Preview the production build**
   ```bash
   pnpm run preview
   ```

---

## 🧰 Available Scripts & Commands

| Command           | Description                  |
| ----------------- | ---------------------------- |
| `pnpm run dev`     | Start development server     |
| `pnpm run build`   | Build the app for production |
| `pnpm run preview` | Preview built app locally    |

---

## ⚙️ Technology stack and architecture decisions

**⚙️ Tech Stack**

- React (with Hooks)

- Tailwind CSS v4

- TanStack Query — for fetching and caching todos

- React Router — for routing

- LocalStorage — for offline persistence

- Vite — for fast bundling and development

**🏗️ Architecture Decisions**

- APIs
- fetchTodos - fetch todo items from the todo API
- fetchTodoDetails - Display details page
- upDateTodos - Edit and update todo tasks/item

- Components

  - UI — UI components from Shadcn

  - ErrorBoundary — single todo with edit/delete functionality

  - LoadingSpinner — Page loading application

- Pages
  - CrashTest - For crash test
  - Home - landing page
  - Navbar - Navigation bar
  - Todos - main list component
  - SingleTodo - single todo with edit/delete functionality
  - NotFound - 404 Error page
- App.jsx
- Index.css
- Main.jsx - main
- Index.css

---

## 📡 API Reference

**The app uses the JSONPlaceholder fake REST API for initial todo data.**
`GET /todos`

- Fetches all Todos
- Returns first 200 Todos
- Fields

```json
{
	"userId": 1,
	"id": 1,
	"title": "delectus aut autem",
	"completed": false
}
```

---

## Screenshots and videos of key features

![Home page screenshot](./public/Screenshot%202025-06-13%20133728.png)

![Todo list screenshot](./public/Screenshot%202025-06-13%20133700.png)

[![Video showing key functionalities](./public/Screenshot%202025-06-13%20133728.png)](https://drive.google.com/file/d/1JCsad36Nyeir7wWklXjvx_6xPgUiXOjs/view?usp=sharing)

---

## ⚠️ Known Issues

- Edits made while offline may not reflect correctly if local storage   syncing fals

- Currently lacks user authentication

- Pagination resets on refresh (enhancement planned)

---

## 🚧 Planned Improvements

- 🔐 Add user authentication (JWT/Session)

- ☁️ Replace localStorage with IndexedDB or backend

- 📱 Add mobile PWA support

- 🔍 Search/filter todos