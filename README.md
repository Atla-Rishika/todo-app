# Todo List App (React + Vite)

A clean, responsive todo list built with React `useState`, event handling and array methods.

## Features
- Add a new task (button or Enter key)
- Display all tasks
- Edit a task (Enter to save, Esc to cancel)
- Delete a task
- Mark tasks as completed / not completed
- Bonus: filter (All / Active / Completed) and "Clear completed"

## Run it

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal (usually http://localhost:5173).

To create a production build: `npm run build`

## Where each requirement lives (`src/App.jsx`)
| Feature | Handler | Array method |
|---|---|---|
| Add | `handleAdd` | spread `[...tasks, newTask]` |
| Display | JSX in `visibleTasks.map(...)` | `map`, `filter` |
| Edit | `startEdit` / `saveEdit` | `map` |
| Delete | `handleDelete` | `filter` |
| Complete | `handleToggle` | `map` |
