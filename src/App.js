
import "bootstrap/dist/css/bootstrap.min.css";
import TaskForm from "./components/TaskForm/TaskForm.jsx"
import "./App.css";

function App() {
  return (
    <div className="todo-list-wrapper">
        <h1>Achieve It</h1>
        <TaskForm />
    </div>
  );
}

export default App;
