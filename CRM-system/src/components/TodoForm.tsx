import '../styles/TodoForm.scss';

const TodoForm = () => {
  return (
    <form className="input-section">
      <input
        type="text"
        placeholder="Task To Be Done..."
        className="task-input"
      />
      <button type="submit" className="add-button">
        Add
      </button>
    </form>
  );
};

export default TodoForm;