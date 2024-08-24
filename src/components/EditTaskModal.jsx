import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

const EditTaskModal = ({ task, show, onClose, onSave }) => {
  const [newName, setNewName] = useState('');

  useEffect(() => {
    if (task) {
      setNewName(task.name); // Aggiorna newName quando task cambia
    }
  }, [task]);

  const handleSave = () => {
    if (newName.trim()) {
      onSave(newName);
      onClose(); // Chiude il modale solo se il nome non è vuoto
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type="text"
          className="form-control"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button className='btn btn-dark' onClick={onClose}>
          Close
        </Button>
        <Button className='btn btn-primary' onClick={handleSave}>
          Save changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditTaskModal;
