import '../styles/TodoTabs.scss';
import { TodoInfo } from '../types/todo';

interface TodoTabsProps {
  error: string;
  success: string;
  filter: string;
  setFilter: (filter: string) => void;
  todoInfo: TodoInfo;
}

const TodoTabs: React.FC<TodoTabsProps> = ({ error, success, filter, setFilter, todoInfo }) => {
  return (
    <div className="tabs-container">
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <div className="tabs">
        <button 
          className={`tab ${filter === "Всё" ? "active" : ""}`}
          onClick={() => setFilter("Всё")}
        >
          Всё ({todoInfo.all})
        </button>
        <button 
          className={`tab ${filter === "В работе" ? "active" : ""}`}
          onClick={() => setFilter("В работе")}
        >
          В работе ({todoInfo.all})
        </button>
        <button 
          className={`tab ${filter === "Сделано" ? "active" : ""}`}
          onClick={() => setFilter("Сделано")}
        >
          Сделано ({todoInfo.completed})
        </button>
      </div>
    </div>
  );
};

export default TodoTabs;