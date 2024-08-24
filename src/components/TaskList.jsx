import { ListGroup, Button, CloseButton } from "react-bootstrap";
import { useState, useEffect } from "react";
import EditTaskModal from "./EditTaskModal";
import Calendar from "./Calendar";

const TaskList = () => {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState(() => {
    const savedTaskList = localStorage.getItem("taskList");
    return savedTaskList ? JSON.parse(savedTaskList) : [];
  });

  const [closedTasks, setClosedTasks] = useState(() => {
    const savedClosedTasks = localStorage.getItem("closedTasks");
    return savedClosedTasks ? JSON.parse(savedClosedTasks) : [];
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(taskList));
    localStorage.setItem("closedTasks", JSON.stringify(closedTasks));
  }, [taskList, closedTasks]);

  const handleAddTask = () => {
    if (task) {
      const newTask = {
        id: Date.now(),
        name: task,
        dueDate: null, // Aggiungi il campo per la data di scadenza
      };
      setTaskList([...taskList, newTask]);
      setTask("");
    }
  };

  const handleRemoveTask = (taskToRemove) => {
    setTaskList(taskList.filter((t) => t.id !== taskToRemove.id));
    setClosedTasks([...closedTasks, taskToRemove]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  const handleRemoveClosedTask = (closedTaskToRemove) => {
    setClosedTasks(
      closedTasks.filter((task) => task.id !== closedTaskToRemove.id)
    );
  };

  const handleRestoreTask = (taskToRestore) => {
    // Rimuove la task dalla lista dei compiti chiusi
    setClosedTasks(closedTasks.filter((t) => t.id !== taskToRestore.id));

    // Aggiunge la task alla lista dei compiti attivi
    setTaskList([...taskList, taskToRestore]);
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
        <Button className="btn btn-dark" onClick={handleAddTask}>
          Add Task
        </Button>
      </div>

      <div className="task-list">
        <h2>TO DO</h2>
        <ListGroup>
          {taskList.map((t) => (
            <ListGroup.Item key={t.id}>
              <div className="task-wrapper">
                <input
                  className="float"
                  type="radio"
                  onClick={() => handleRemoveTask(t)}
                />
                {t.name}
              </div>
              <div className="btn-wrapper">
                {t.dueDate && (
                  <span className="date"
                  style={{
                    color:
                      new Date(t.dueDate).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)
                        ? "red"
                        : "black",
                  }}>
                    {new Date(t.dueDate).toLocaleDateString()}
                  </span>
                )}
                <button
                  className="edit-btn"
                  onClick={() => {
                    setSelectedTask(t);
                    setShowEditModal(true);
                  }}
                >
                  <i class="bi bi-pencil-square"></i>
                </button>
                <button
                  className="date-btn"
                  onClick={() => {
                    setSelectedTask(t);
                    setShowCalendar(true);
                  }}
                >
                  <i class="bi bi-calendar3-event"></i>
                </button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>

      <div className="deleted-task">
        <h2>ACHIEVED</h2>
        <ListGroup>
          {closedTasks.map((t) => (
            <ListGroup.Item key={t.id}>
              <div className="task-wrapper text-decoration-line-through">
                <input
                  type="radio"
                  checked
                  readOnly
                  onClick={() => handleRestoreTask(t)}
                />
                {t.name}
              </div>
              <div className="btn-wrapper">
                {t.dueDate && (
                  <span
                    className="date"
                    style={{
                      color:
                        new Date(t.dueDate).setHours(0, 0, 0, 0) <
                        new Date().setHours(0, 0, 0, 0)
                          ? "red"
                          : "black",
                    }}
                  >
                    {new Date(t.dueDate).toLocaleDateString()}
                  </span>
                )}
                <CloseButton
                  onClick={() => handleRemoveClosedTask(t)}
                ></CloseButton>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>

      <EditTaskModal
        task={selectedTask}
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={(newName) => {
          setTaskList(
            taskList.map((task) =>
              task.id === selectedTask.id ? { ...task, name: newName } : task
            )
          );
        }}
      />

      <Calendar
        task={selectedTask}
        show={showCalendar}
        onClose={() => setShowCalendar(false)}
        onSave={(date) => {
          setTaskList(
            taskList.map((task) =>
              task.id === selectedTask.id ? { ...task, dueDate: date } : task
            )
          );
        }}
      />
    </div>
  );
};

export default TaskList;
