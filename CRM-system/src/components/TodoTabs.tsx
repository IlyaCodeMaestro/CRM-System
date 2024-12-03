import '../styles/TodoTabs.scss';
import { TodoInfo } from '../types/todo';

interface TodoTabsProps {
  error: string;
  success: string;
  filter: "all" | "completed" | "inWork";
  setFilter: (filter: "all" |"completed" | "inWork") => void;
  todoInfo: TodoInfo;
}

const TodoTabs: React.FC<TodoTabsProps> = ({ error, success, filter, setFilter, todoInfo }) => {
  return (
    <div className="tabs-container">
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <div className="tabs">
        <button 
          className={`tab ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          Всё ({todoInfo.all})
        </button>
        <button 
          className={`tab ${filter === "inWork" ? "active" : ""}`}
          onClick={() => setFilter("inWork")}
        >
          В работе ({todoInfo.inWork})
        </button>
        <button 
          className={`tab ${filter === "completed" ? "active" : ""}`}
          onClick={() => setFilter("completed")}
        >
          Сделано ({todoInfo.completed})
        </button>
      </div>
    </div>
  );
};

export default TodoTabs;