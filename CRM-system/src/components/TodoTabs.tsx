import '../styles/TodoTabs.scss';

const TodoTabs: React.FC = () => {
  return (
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
  );
};

export default TodoTabs;