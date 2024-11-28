import "./styles/App.scss";
import { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import TodoTabs from "./components/TodoTabs";
import { Todo, TodoInfo, MetaResponse, TodoRequest } from "./types/todo";

const API_BASE_URL = "https://easydev.club/api/v1";

const App = () => {
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [todoInfo, setTodoInfo] = useState<TodoInfo>({
    all: 0,
    completed: 0,
    inWork: 0,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [filter, setFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/todos`);
      if (!response.ok) {
        throw new Error("Не удалось загрузить задачи");
      }
      const data: MetaResponse<Todo, TodoInfo> = await response.json();
      if (Array.isArray(data.data)) {
        setTasks(data.data);
      } else if (typeof data.data === "object" && data.data !== null) {
        setTasks(Object.values(data.data));
      } else {
        console.error("Unexpected data structure:", data);
        setTasks([]);
      }

      if (data.info) {
        setTodoInfo(data.info);
      }
      setIsLoading(false);
    } catch (error) {
      setError("Ошибка при загрузке задач");
      setIsLoading(false);
    }
  };

  const addTask = async (text: string) => {
    if (text.trim().length < 2 || text.length > 64) {
      setError("Задача должна содержать от 2 до 64 символов");
      setSuccess("");
      return;
    }

    try {
      const todoRequest: TodoRequest = {
        title: text,
        isDone: false,
      };

      const response = await fetch(`${API_BASE_URL}/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todoRequest),
      });

      if (!response.ok) {
        throw new Error("Не удалось создать задачу");
      }

      const data: MetaResponse<Todo, TodoInfo> = await response.json();
      if (Array.isArray(data.data)) {
        setTasks((prevTasks) => [...prevTasks, ...data.data]);
      } else if (typeof data.data === "object" && data.data !== null) {
        setTasks((prevTasks) => [...prevTasks, ...Object.values(data.data)]);
      } else {
        console.error("Unexpected data structure:", data);
      }
      if (data.info) {
        setTodoInfo(data.info);
      }
      setSuccess("Задача успешно создана в системе");
      setError("");
    } catch (error) {
      setError("Ошибка при создании задачи");
    }

    setTimeout(() => {
      setSuccess("");
      setError("");
    }, 2000);
  };

  const toggleTask = async (id: number) => {
    try {
      const taskToToggle = tasks.find((task) => task.id === id);
      if (!taskToToggle) return;

      const todoRequest: TodoRequest = {
        isDone: !taskToToggle.isDone,
      };

      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todoRequest),
      });

      if (!response.ok) {
        throw new Error("Не удалось обновить задачу");
      }

      const data: MetaResponse<Todo, TodoInfo> = await response.json();
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? data.data[0] : task))
      );
      if (data.info) {
        setTodoInfo(data.info);
      }
    } catch (error) {
      setError("Ошибка при обновлении задачи");
    }
  };

  const updateTaskText = async (id: number, newText: string) => {
    try {
      const todoRequest: TodoRequest = {
        title: newText,
      };

      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: "UPDATE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todoRequest),
      });

      if (!response.ok) {
        throw new Error("Не удалось обновить текст задачи");
      }

      const data: MetaResponse<Todo, TodoInfo> = await response.json();
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? data.data[0] : task))
      );
      if (data.info) {
        setTodoInfo(data.info);
      }
    } catch (error) {
      setError("Ошибка при обновлении текста задачи");
    }
  };

  const deleteTask = async (id: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Не удалось удалить задачу");
      }

      const data: MetaResponse<Todo, TodoInfo> = await response.json();
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      if (data.info) {
        setTodoInfo(data.info);
      }
    } catch (error) {
      setError("Ошибка при удалении задачи");
    }
  };

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="todo-app">
      <TodoForm addTask={addTask} />
      <TodoTabs
        error={error}
        success={success}
        filter={filter}
        setFilter={setFilter}
        todoInfo={todoInfo}
      />
      <TodoList
        tasks={tasks}
        filter={filter}
        toggleTask={toggleTask}
        updateTaskText={updateTaskText}
        deleteTask={deleteTask}
      />
    </div>
  );
};

export default App;
