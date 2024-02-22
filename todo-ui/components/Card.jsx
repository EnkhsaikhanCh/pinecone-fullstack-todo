import axios from "axios";
import { useEffect, useState } from "react";

const API_BASE_URL = `http://localhost:3000/tasks`;
const CREATE_ENDPOINT = `create`;
const UPDATE_ENDPOINT = `update`;
const DELETE_ENDPOINT = `delete`;

export function Card() {
  const [tasks, setTasks] = useState([]);

  function loadTasks() {
    axios.get(`${API_BASE_URL}`).then(
      (response) => {
        setTasks(response.data);
      },
      (error) => {
        console.error("Error loading task:", error.message);
      },
    );
  }

  function handleApiError(error) {
    console.error("API request error: ", error.message);
  }

  // Create ---------------------------------------------
  function createNewTask() {
    const title = prompt("task name?");

    if (title) {
      axios
        .post(`${API_BASE_URL}/${CREATE_ENDPOINT}`, {
          title,
        })
        .then(() => {
          loadTasks();
        })
        .catch(handleApiError);
    }
  }

  // Read ---------------------------------------------
  useEffect(() => {
    loadTasks();
  }, []);

  // Update ---------------------------------------------
  function editTask(task) {
    const editedTask = prompt("Edit?", task.title);

    if (editedTask) {
      axios
        .put(`${API_BASE_URL}/${UPDATE_ENDPOINT}/${task.id}`, {
          title: editedTask,
        })
        .then(() => {
          loadTasks();
        })
        .catch(handleApiError);
    }
  }

  // Delete ---------------------------------------------
  function deleteTask(id) {
    if (window.confirm("Delete?")) {
      axios
        .delete(`${API_BASE_URL}/${DELETE_ENDPOINT}/${id}`)
        .then(() => {
          loadTasks();
        })
        .catch(handleApiError);
    }
  }

  return (
    <div className="container mx-auto my-4 flex justify-center">
      <div className="flex flex-col">
        <div>
          <button
            className="btn btn-primary mb-4 text-lg"
            onClick={createNewTask}
          >
            New task
          </button>
        </div>
        <div className="flex flex-col gap-1">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="item-center card flex h-[70px] w-[600px] justify-center rounded-md bg-base-200 shadow-sm"
            >
              <div className="mx-8 flex items-center gap-2 text-xl">
                <div className="flex-1 text-white">{task.title}</div>
                <button
                  className="btn btn-neutral btn-sm"
                  onClick={() => editTask(task)}
                >
                  edit
                </button>
                <button
                  className="btn btn-neutral btn-sm"
                  onClick={() => deleteTask(task.id)}
                >
                  delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
