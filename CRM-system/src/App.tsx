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
  const [filter, setFilter] = useState<"all" | "completed" | "inWork">("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTasks();

    const intervalId = setInterval(() => {
      fetchTasks();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [filter]);

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/todos?filter=${filter}`);
      if (!response.ok) {
        throw new Error("Не удалось загрузить задачи");
      }
      const data: MetaResponse<Todo, TodoInfo> = await response.json();
      setTasks(data.data);
      if (data.info) {
        setTodoInfo(data.info);
      }
      setIsLoading(false);
    } catch (error) {
      showMessage("error", "Ошибка при загрузке задач");
    } finally {
      setIsLoading(false);
    }
  };

  const addTask = async (text: string) => {
    if (text.trim().length < 2 || text.length > 64) {
      showMessage("error", "Задача должна содержать от 2 до 64 символов");
      return;
    }

    try {
      const todoRequest: TodoRequest = {
        title: text,
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

      const newTodo: Todo = await response.json();
      setTasks((prevTasks) => [...prevTasks, newTodo]);
      setTodoInfo((prevInfo) => ({
        ...prevInfo,
        all: prevInfo.all + 1,
        inWork: prevInfo.inWork + 1,
      }));
      showMessage("success", "Задача успешно обновлена");
    } catch (error) {
      showMessage("error", "Ошибка при создании задачи");
    }
  };

  function showMessage(type: "error" | "success", message: string) {
    if (type === "error") setError(message);
    if (type === "success") setSuccess(message);

    setTimeout(() => {
      if (type === "error") setError("");
      if (type === "success") setSuccess("");
    }, 2000);
  }

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

      const updatedTodo: Todo = await response.json();
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? updatedTodo : task))
      );
      setTodoInfo((prevInfo) => ({
        ...prevInfo,
        completed: prevInfo.completed + (updatedTodo.isDone ? 1 : -1),
        inWork: prevInfo.inWork + (updatedTodo.isDone ? -1 : 1),
      }));
      showMessage("success", "Задача успешно обновлена");
    } catch (error) {
      showMessage("error", "Ошибка при обновлении задачи");
    }
  };

  const updateTaskText = async (id: number, newText: string) => {
    try {
      const todoRequest: TodoRequest = {
        title: newText,
      };

      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todoRequest),
      });

      if (!response.ok) {
        throw new Error("Не удалось обновить текст задачи");
      }

      const updatedTodo: Todo = await response.json();
      setTasks((prevTasks) => {
        console.log("updateTaskText3.1");
        return prevTasks.map((task) => (task.id === id ? updatedTodo : task));
      });
      showMessage("success", "Текст задачи успешно обновлён");
    } catch (error) {
      showMessage("error", "Ошибка при обновлении текста задачи");
    }
  };

  const deleteTask = async (id: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Не удалось удалить задачу");
      }

      const deletedTask = tasks.find((task) => task.id === id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      setTodoInfo((prevInfo) => ({
        ...prevInfo,
        all: prevInfo.all - 1,
        completed: prevInfo.completed - (deletedTask?.isDone ? 1 : 0),
        inWork: prevInfo.inWork - (deletedTask?.isDone ? 0 : 1),
      }));
      showMessage("success", "Задача успешно удалена");
    } catch (error) {
      showMessage("error", "Ошибка при удалении задачи");
    } finally {
      setIsLoading(false);
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
