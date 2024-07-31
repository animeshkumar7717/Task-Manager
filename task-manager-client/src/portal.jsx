import React, { useState } from 'react';
import XIcon from '@mui/icons-material/X';

const Portal = ({ data, updatedTodo, onClose }) => {
  const [todo, setTodo] = useState(data.taskName || '');

  const customStyle = {
    padding: "10px",
    fontSize: '18px',
    backgroundColor: "#e7f3f3",
    border: "none",
    borderRadius: "5px",
    marginRight: "10px",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo.trim()) {
      updatedTodo(data._id, todo)
      setTodo('');
      onClose();
    }
  };

  return (
    <div className="update-task-container">
      <div className="d-flex justify-content-end">
        <XIcon className="close-icon cursor-pointer" color='info' onClick={onClose} />
      </div>
      <div>  
        <h3 className="form-label text-center m-5">Update Task</h3>
        <form onSubmit={handleSubmit} className="text-center">
          <div className="mb-3">
            <div className="custom-input">
              <input
                type="text"
                className="form-control m-3"
                placeholder="Update task"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                style={customStyle}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary p-2">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Portal;
