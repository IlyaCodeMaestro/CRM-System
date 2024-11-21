import TodoItem from "./TodoItem";
import "../styles/TodoList.scss";

const TodoList = () => {
  return (
    <div className="tasks-list">
      <TodoItem completed={true} text="прочитать книгу" />
      <TodoItem completed={false} text="монтаж видео" />
      <TodoItem completed={false} text="сходить в кино" />
      <TodoItem completed={false} text="купить фрукты" />
      <TodoItem completed={false} text="пойти в тренажёрный зал" />
    </div>
  );
};

export default TodoList;
