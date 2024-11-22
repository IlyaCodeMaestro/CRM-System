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
  updateTaskText: (id: number, newText: string) => void;
  deleteTask: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  tasks,
  toggleTask,
  updateTaskText,
  deleteTask,
}) => {
  return (
    <div className="tasks-list">
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          toggleTask={toggleTask}
          updateTaskText={updateTaskText}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
};

export default TodoList;
