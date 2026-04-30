import React, { useState, useMemo } from "react";

// Generate 50 todos (25 active + 25 completed)
const generateTodos = () => {
  const todos = [];

  for (let i = 1; i <= 50; i++) {
    todos.push({
      id: i,
      text: `Todo ${i}`,
      completed: i > 25
    });
  }

  return todos;
};

// Artificial slowdown function
const slowFunction = () => {
  const start = performance.now();
  while (performance.now() - start < 500) {
    // Delay for 500ms
  }
};

function App() {
  const [tab, setTab] = useState("all");
  const [darkMode, setDarkMode] = useState(false);

  const todos = useMemo(() => generateTodos(), []);

  // Memoized filtered todos
  const filteredTodos = useMemo(() => {
    slowFunction();

    if (tab === "active") {
      return todos.filter((todo) => !todo.completed);
    }

    if (tab === "completed") {
      return todos.filter((todo) => todo.completed);
    }

    return todos;
  }, [tab, todos]);

  return (
    <div
      style={{
        backgroundColor: darkMode ? "#222" : "#fff",
        color: darkMode ? "#fff" : "#000",
        minHeight: "100vh",
        padding: "20px"
      }}
    >
      <button onClick={() => setTab("all")}>All</button>
      <button onClick={() => setTab("active")}>Active</button>
      <button onClick={() => setTab("completed")}>Completed</button>
      <button onClick={() => setDarkMode(!darkMode)}>
        Toggle Dark Mode
      </button>

      <p><b>Note: List is artificially slowed down!</b></p>

      <ul>
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            style={{
              textDecoration: todo.completed
                ? "line-through"
                : "none"
            }}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;