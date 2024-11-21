import TodoItem from "./TodoItem";
import "../styles/TodoList.scss";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  tasks: Task[];
  toggleTask: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ tasks, toggleTask }) => {
  return (
    <div className="tasks-list">
      {tasks.map((task) => (
        <TodoItem key={task.id} task={task} toggleTask={toggleTask} />
      ))}
    </div>
  );
};

export default TodoList;
