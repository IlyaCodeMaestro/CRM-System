import TodoItem from "./TodoItem";
import "../styles/TodoList.scss";
import { Todo } from '../types/todo';

interface TodoListProps {
  tasks: Todo[];
  filter: string;
  toggleTask: (id: number) => void;
  updateTaskText: (id: number, newText: string) => void;
  deleteTask: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ tasks, filter, toggleTask, updateTaskText, deleteTask }) => {
  const filterTasks = (tasks: Todo[], filter: string) => {
    if (filter === "Всё") return tasks;
    if (filter === "В работе") return tasks.filter(task => !task.isDone);
    if (filter === "Сделано") return tasks.filter(task => task.isDone);
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

