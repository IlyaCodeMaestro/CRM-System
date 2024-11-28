import React, { useState } from "react";
import "../styles/TodoForm.scss";

interface TodoFormProps {
  addTask: (text: string) => Promise<void>;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTask }) => {
  const [newTask, setNewTask] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      setIsSubmitting(true);
      await addTask(newTask);
      setNewTask("");
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="input-section">
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Введите новую задачу..."
        className="task-input"
        disabled={isSubmitting}
        required
      />
      <button type="submit" className="add-button" disabled={isSubmitting}>
        {isSubmitting ? "Добавление..." : "Добавить"}
      </button>
    </form>
  );
};

export default TodoForm;
