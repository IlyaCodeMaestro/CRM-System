import "./styles/App.scss";
import { useState } from "react";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import TodoTabs from "./components/TodoTabs";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "прочитать книгу", completed: true },
    { id: 2, text: "монтаж видео", completed: false },
    { id: 3, text: "сходить в кино", completed: false },
    { id: 4, text: "купить фрукты", completed: false },
    { id: 5, text: "пойти в тренажёрный зал", completed: false },
  ]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const toggleTask = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const addTask = (text: string) => {
    if (text.trim().length < 2 || text.length > 64) {
      setError("Задача должна содержать от 2 до 64 символов");
      setSuccess("");
      return;
    }
    const newTask: Task = {
      id: Date.now(),
      text: text,
      completed: false
    }
    setTasks(prevTasks => [...prevTasks, newTask]);
    setSuccess("Задача успешно создана в системе");
    setError("");
    setTimeout(() => {setError("")},2000)
    // Почему не работает для двух функций?
    setTimeout(()=> {setSuccess("")},2000)
  }

  const updateTaskText = (id: number, newText: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    console.log("Удалённое задание с айдишником:", id);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <div className="todo-app">
      <TodoForm addTask={addTask}/>
      <TodoTabs error={error} success={success} />
      <TodoList 
        tasks={tasks} 
        toggleTask={toggleTask} 
        updateTaskText={updateTaskText}
        deleteTask={deleteTask}
      />
    </div>
  );
};

export default App;

