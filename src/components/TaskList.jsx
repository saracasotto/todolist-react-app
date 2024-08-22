import { Container, Row, ListGroup, Card, Button } from "react-bootstrap";
import { useState } from 'react';

const TaskList = () => { 
    const [task, setTask] = useState('');
    const [taskList, setTaskList] = useState([]);
    const [closedTasks, setClosedTasks] = useState([])

    const handleAddTask = () => {
        if (task) {
            setTaskList([...taskList, task]); // Aggiungi il nuovo compito alla lista esistente
            setTask('');
        }
    };

    const handleRemoveTask = (taskToRemove) => {
        // Rimuovi il compito dalla lista dei compiti attivi
        setTaskList(taskList.filter(t => t !== taskToRemove));
        // Aggiungi il compito alla lista dei compiti completati
        setClosedTasks([...closedTasks, taskToRemove]);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleAddTask(); // Aggiungi il compito se il tasto premuto è "Enter"
        }
    };

    return (
        <Container>
            <input 
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Add a new task"
                onKeyDown={handleKeyDown}
            />
            <Button onClick={handleAddTask}>Add</Button>

            <Row>
                <Card style={{ width: "18rem" }}>
                    <ListGroup variant="flush">
                        {taskList.map((t, index) => (
                            <ListGroup.Item key={index}>{t}
                                <input 
                                className="form-check-input" 
                                type="checkbox"  
                                onClick={() => handleRemoveTask(t)} />
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Card>
                <Card style={{ width: "18rem" }}>
                    <ListGroup variant="flush">
                        {closedTasks.map((t, index) => (
                            <ListGroup.Item key={index}
                            className="text-decoration-line-through"
                            > {t}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Card>
            </Row>
        </Container>
    );
};

export default TaskList;
