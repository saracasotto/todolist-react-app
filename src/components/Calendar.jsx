import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const Calendar = ({ task, show, onClose, onSave }) => {
  const [selectedDate, setSelectedDate] = useState(task ? task.dueDate : '');

  const handleSave = () => {
    onSave(selectedDate ? new Date(selectedDate) : null);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Select Due Date</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type="date"
          className="form-control"
          value={selectedDate}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Date
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Calendar;
