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
  const toggleTask = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const addTask = (text: string) => {
    const newTask: Task = {
      id: Date.now(),
      text:text,
      completed:false
    }
    setTasks(prevTasks => [...prevTasks, newTask])
  }

  return (
    <div className="todo-app">
      <TodoForm addTask={addTask}/>
      <TodoTabs />
      <TodoList tasks={tasks} toggleTask={toggleTask} />
    </div>
  );
};

export default App;
