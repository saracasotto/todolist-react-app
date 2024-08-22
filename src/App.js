
import "bootstrap/dist/css/bootstrap.min.css";
import TaskList from "./components/TaskList.jsx";
import "./App.css";

function App() {
  return (
    <div className="todo-list-wrapper">
        <h1>Achieve It</h1>
        <TaskList />
    </div>
  );
}

export default App;
