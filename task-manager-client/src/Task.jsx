import React, { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import { red } from "@mui/material/colors";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { createTask, deleteTask, getAllTask, isDoneTask, updateTask } from "./all-api.js";
import Portal from "./portal.jsx";
import ReactDOM from 'react-dom';

const Modal = ({ isOpen, children }) => {
  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
      </div>
    </div>,
    document.getElementById('react-portal')
  );
};

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    getAllTasks();
  }, []);

  const filterTask = tasks.filter((item) =>
    item.taskName.toLowerCase().includes(search.toLowerCase())
  );

  const getAllTasks = async () => {
    try {
      const response = await getAllTask();
      setTasks(response.data.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleAddButton = async () => {
    if (text) {
      try {
        const createTodo = { taskName: text };
        await createTask(createTodo);
        getAllTasks();
        setText("");
      } catch (error) {
        console.error("Error creating task:", error);
      }
    } else {
      alert("Please write a task before adding.");
    }
  };

  const onTickHandler = async (id) => {
    try {
      const updatedTasks = tasks.map(task => {
        if (task._id === id) {
          task.isDone = !task.isDone;
          isDoneTask(id, task.isDone);
        }
        return task;
      });
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const onUpdateHandler = async(task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleUpdatedTodo = async(id, name) => {
    await updateTask(id, name);
    getAllTasks()
  }

  const onDeleteHandler = async (id) => {
    try {
      await deleteTask(id);
      getAllTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div>
      <div
        className="text-success-emphasis d-flex justify-content-center shadow p-3 mb-5 rounded"
        style={{ padding: "10px", backgroundColor: "#e7f3f3", border: "none", borderRadius: "5px", marginRight: "10px" }}
      >
        <h3> Task Manager </h3>
      </div>
      <div className="d-flex justify-content-center">
        <div className="d-flex justify-content-center p-3">
          <input
            type="text"
            value={text}
            placeholder="add todo"
            onChange={(e) => setText(e.target.value)}
            style={{ padding: "10px", backgroundColor: "#e7f3f3", border: "none", borderRadius: "5px", marginRight: "10px" }}
          />
          <button onClick={handleAddButton} style={{ padding: "10px", backgroundColor: "#e7f3f3", border: "none", borderRadius: "5px", marginRight: "10px" }}>
            <AddCircleIcon color="success" />
          </button>
        </div>
        <div className="d-flex justify-content-center p-3">
          <input
            type="text"
            placeholder="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: "10px", backgroundColor: "#e7f3f3", border: "none", borderRadius: "5px", marginRight: "10px" }}
          />
          <button onClick={() => setSearch("")} style={{ padding: "10px", backgroundColor: "#e7f3f3", border: "none", borderRadius: "5px", marginRight: "10px" }}>
            <RestartAltIcon color="success" />
          </button>
        </div>
      </div>
      <div>
        {filterTask.map((todo) => (
          <div
            className="text-success-emphasis p-3 m-5 rounded"
            style={{ padding: "10px", backgroundColor: "#e7f3f3", border: "none", borderRadius: "5px", marginRight: "10px" }}
            key={todo._id}
          >
            <div className="d-flex justify-content-start">
              <h5 className={todo.isDone ? "text-decoration-line-through" : ""}>
                {todo.taskName}
              </h5>
            </div>
            <div className="d-flex justify-content-end change-todo ">
              <CheckCircleIcon
                color="success"
                onClick={() => onTickHandler(todo._id)}
              />
              <EditIcon color="info" sx={{ marginLeft: 2 }} onClick={() => onUpdateHandler(todo)} />
              <DeleteForeverIcon
                sx={{ color: red[500], marginLeft: 2 }}
                onClick={() => onDeleteHandler(todo._id)}
              />
            </div>
          </div>
        ))}
      </div>
      <Modal isOpen={isModalOpen} >
        {selectedTask && (
          <Portal
            data={selectedTask}
            onClose={() => setIsModalOpen(false)}
            updatedTodo={(id,name)=>handleUpdatedTodo(id,name)}
          />
        )}
      </Modal>
    </div>
  );
};

export default Task;
