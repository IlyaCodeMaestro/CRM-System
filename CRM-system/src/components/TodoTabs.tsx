import '../styles/TodoTabs.scss';

interface TodoTabsProps {
  error: string;
  success: string;
}

const TodoTabs: React.FC<TodoTabsProps> = ({error,success}) => {
  return (
    <div className="tabs-container">
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <div className="tabs">
        <button className="tab active">
          Всё (5)
        </button>
        <button className="tab">
          в работе(4)
        </button>
        <button className="tab">
          сделано(1)
        </button>
      </div>
    </div>
  );
};

export default TodoTabs;