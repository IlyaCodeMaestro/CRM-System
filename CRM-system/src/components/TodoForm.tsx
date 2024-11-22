import "../styles/TodoForm.scss";
import { useState } from "react";

interface TodoFormProps {
  addTask: (text: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTask }) => {
  const [newTask, setNewTask] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTask(newTask);
    setNewTask("");
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
    </form>
  );
};

export default TodoForm;

