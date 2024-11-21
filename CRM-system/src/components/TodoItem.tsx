import "../styles/TodoItem.scss";
interface Task {
  id: number;
  completed: boolean;
  text: string;
}
interface TodoItemProps {
  task: Task;
  toggletask: (id: number) => null;
}

const TodoItem: React.FC<TodoItemProps> = ({ task, toggleTask }) => {
  return (
    <div className="task-item">
      <label className="checkbox-container">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
        />
        <span className="checkmark"></span>
        <span className={`task-text ${task.completed ? "completed" : ""}`}>
          {task.text}
        </span>
      </label>
      <div className="task-actions">
        <button className="edit-button">
          <svg width="16" height="16" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
            />
          </svg>
        </button>
        <button className="delete-button">
          <svg width="16" height="16" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
