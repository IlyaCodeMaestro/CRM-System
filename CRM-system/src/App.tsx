import "./styles/App.scss";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import TodoTabs from "./components/TodoTabs";
const App = () => {
  return (
    <>
      <TodoForm />
      <TodoTabs />
      <TodoList />
    </>
  );
}

export default App;
