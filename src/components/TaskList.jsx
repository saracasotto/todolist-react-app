import { ListGroup } from "react-bootstrap";
import { useState } from "react";

const TaskList = () => {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [closedTasks, setClosedTasks] = useState([]);

  const handleAddTask = () => {
    if (task) {
      setTaskList([...taskList, task]); // Aggiungi il nuovo compito alla lista esistente
      setTask("");
    }
  };

  const handleRemoveTask = (taskToRemove) => {
    // Rimuovi il compito dalla lista dei compiti attivi
    setTaskList(taskList.filter((t) => t !== taskToRemove));
    // Aggiungi il compito alla lista dei compiti completati
    setClosedTasks([...closedTasks, taskToRemove]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddTask(); // Aggiungi il compito se il tasto premuto è "Enter"
    }
  };

  return (
    <div className="todo-form">
      <div className="task-creation-form">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task"
          onKeyDown={handleKeyDown}
        />
        <button type="button" className="btn btn-dark" onClick={handleAddTask}>
          Add task
        </button>
      </div>

      <div className="task-list">
        <ListGroup >
          {taskList.map((t, index) => (
            <ListGroup.Item key={index}>
              {t}
              <button
                className="btn-close float-end"
                type="button"
                onClick={() => handleRemoveTask(t)}
              />
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>

      <div className="deleted-task">
        <ListGroup>
          {closedTasks.map((t, index) => (
            <ListGroup.Item
              key={index}
              className="text-decoration-line-through"
            >
              {t}
              <button className="btn-close float-end" type="button"></button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
};

export default TaskList;
