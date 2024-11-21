import "../styles/TodoForm.scss";
import { useState } from "react";

interface TodoFormProps {
  addTask: (text: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTask }) => {
  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newTask.trim().length < 2 || newTask.length > 64) {
      setError("Задача должна содержать от 2 до 64 символов");
      return;
    }
    addTask(newTask);
    setNewTask("");
    setSuccess("Задача успешно создана в системе");
  };

  return (
    <form onSubmit={handleSubmit} className="input-section">
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Task To Be Done..."
        className="task-input"
        required
      />
      <button type="submit" className="add-button">
        Add
      </button>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
    </form>
  );
};

export default TodoForm;
