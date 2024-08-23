import { ListGroup } from "react-bootstrap";
import { useState } from "react";

const TaskList = () => {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [closedTasks, setClosedTasks] = useState([]);

  const handleAddTask = () => {
    if (task) {
      const newTask = {
        id: Date.now(),
        name: task,
      };
      setTaskList([...taskList, newTask]); // Aggiungi il nuovo compito alla lista esistente
      setTask("");
    }
  };

  const handleRemoveTask = (taskToRemove) => {
    // Rimuovi il compito dalla lista dei compiti attivi utilizzando l'ID
    setTaskList(taskList.filter((t) => t.id !== taskToRemove.id));

    // Aggiungi il compito alla lista dei compiti completati
    setClosedTasks([...closedTasks, taskToRemove]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddTask(); // Aggiungi il compito se il tasto premuto è "Enter"
    }
  };

  const handleRemoveClosedTask = (closedTaskToRemove) => {
    setClosedTasks(
      closedTasks.filter((task) => task.id !== closedTaskToRemove.id)
    );
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
        <h2>TO DO</h2>
        <ListGroup>
          {taskList.map((t) => (
            <ListGroup.Item key={t.id}>
              <input
                className="float"
                type="radio"
                onClick={() => handleRemoveTask(t)}
              />
              {t.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>

      <div className="deleted-task">
        <h2>ACHIEVED</h2>
        <ListGroup>
          {closedTasks.map((t) => (
            <ListGroup.Item
              key={t.id}
              className="text-decoration-line-through"
            >
              <input 
              type="radio"
              checked
              />
              {t.name}
              <button
                className="btn-close float-end"
                type="button"
                onClick={() => {
                  handleRemoveClosedTask(t);
                }}
              ></button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
};

export default TaskList;
