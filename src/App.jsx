import { useState } from "react";
import "./App.css";

function App() {

  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [filter, setFilter] = useState("all"); // all | active | completed


  const handleAdd = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setTasks([...tasks, { id: Date.now(), text, completed: false }]);
    setInput("");
  };

 
  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    if (editingId === id) cancelEdit();
  };


  const handleToggle = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };


  const startEdit = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const saveEdit = (id) => {
    const text = editText.trim();
    if (!text) return; // don't allow empty tasks
    setTasks(tasks.map((task) => (task.id === id ? { ...task, text } : task)));
    cancelEdit();
  };

  const handleEditKeyDown = (e, id) => {
    if (e.key === "Enter") saveEdit(id);
    if (e.key === "Escape") cancelEdit();
  };

  // ---- Extras: clear completed + filtering ----
  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const completedCount = tasks.filter((task) => task.completed).length;
  const activeCount = tasks.length - completedCount;

  const visibleTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const emptyMessage = {
    all: "No tasks yet. Add your first one above!",
    active: "Nothing left to do. Nice work!",
    completed: "No completed tasks yet.",
  }[filter];

  return (
    <main className="app">
      <section className="card">
        <header className="header">
          <h1>My Todo List</h1>
          <p className="subtitle">
            {tasks.length === 0
              ? "Stay organized, one task at a time."
              : `${activeCount} remaining · ${completedCount} completed`}
          </p>
        </header>

      
        <form className="add-form" onSubmit={handleAdd}>
          <input
            type="text"
            className="text-input"
            placeholder="What needs to be done?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            aria-label="New task"
          />
          <button type="submit" className="btn btn-primary" disabled={!input.trim()}>
            Add
          </button>
        </form>

        
        {tasks.length > 0 && (
          <div className="filters" role="tablist" aria-label="Filter tasks">
            {["all", "active", "completed"].map((name) => (
              <button
                key={name}
                role="tab"
                aria-selected={filter === name}
                className={`filter-btn ${filter === name ? "active" : ""}`}
                onClick={() => setFilter(name)}
              >
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </button>
            ))}
          </div>
        )}

       
        {visibleTasks.length === 0 ? (
          <p className="empty">{emptyMessage}</p>
        ) : (
          <ul className="task-list">
            {visibleTasks.map((task) => (
              <li
                key={task.id}
                className={`task ${task.completed ? "completed" : ""}`}
              >
                {editingId === task.id ? (
                  <>
                    <input
                      type="text"
                      className="text-input edit-input"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyDown={(e) => handleEditKeyDown(e, task.id)}
                      autoFocus
                      aria-label="Edit task"
                    />
                    <div className="actions">
                      <button
                        className="btn btn-success"
                        onClick={() => saveEdit(task.id)}
                        disabled={!editText.trim()}
                      >
                        Save
                      </button>
                      <button className="btn btn-ghost" onClick={cancelEdit}>
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <label className="task-label">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => handleToggle(task.id)}
                      />
                      <span className="task-text">{task.text}</span>
                    </label>
                    <div className="actions">
                      <button
                        className="btn btn-ghost"
                        onClick={() => startEdit(task)}
                        disabled={task.completed}
                        title={task.completed ? "Un-complete to edit" : "Edit task"}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(task.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}

        {completedCount > 0 && (
          <footer className="footer">
            <button className="link-btn" onClick={clearCompleted}>
              Clear completed ({completedCount})
            </button>
          </footer>
        )}
      </section>
    </main>
  );
}

export default App;
