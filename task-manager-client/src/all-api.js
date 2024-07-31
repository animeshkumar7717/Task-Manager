import axios from "axios";
import { API } from "./libs";

export const getAllTask = async () => {
  try {
    const allTasks = await axios.get(`${API}/task`, {
      headers: {
        "content-type": "application/json",
      },
    });
    return allTasks;
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

export const createTask = async (todo) => {
  try {
    const createTasks = await axios.post(`${API}/task`, todo, {
      headers: {
        "content-type": "application/json",
      },
    });
    return createTasks;
  } catch (error) {
    console.error("Error creating task:", error);
  }
};

export const deleteTask = async (id) => {
  try {
    const deleteTasks = await axios.delete(`${API}/task/${id}`);
    return deleteTasks;
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};

export const isDoneTask = async (id, isDone) => {
  try {
    const updateTickTask = await axios.put(
      `${API}/task/${id}`,
      { isDone },
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
    return updateTickTask;
  } catch (error) {
    console.error("Error updating task status:", error);
  }
};

export const updateTask = async (id, name) => {
  try {
    const updateTickTask = await axios.put(
      `${API}/task/${id}`,
      { taskName: name },
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
    return updateTickTask;
  } catch (error) {
    console.error("Error updating task status:", error);
  }
};
