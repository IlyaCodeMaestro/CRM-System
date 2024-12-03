import TodoItem from "./TodoItem";
import "../styles/TodoList.scss";
import { Todo } from '../types/todo';

interface TodoListProps {
  tasks: Todo[];
  filter: "all" | "completed" | "inWork";
  toggleTask: (id: number) => void;
  updateTaskText: (id: number, newText: string) => void;
  deleteTask: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ tasks, filter, toggleTask, updateTaskText, deleteTask }) => {
  const filterTasks = (tasks: Todo[], filter: "all" | "completed" | "inWork") => {
    if (filter === "all") return tasks;
    if (filter === "inWork") return tasks.filter(task => !task.isDone);
    if (filter === "completed") return tasks.filter(task => task.isDone);
    return tasks;
  };

  const filteredTasks = filterTasks(tasks, filter);

  return (
    <div className="tasks-list">
      {filteredTasks.map((task) => (
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

