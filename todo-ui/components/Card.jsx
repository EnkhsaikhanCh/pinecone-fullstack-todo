import axios from "axios";
import { useEffect, useState } from "react";

export function Card() {
  const [tasks, setTasks] = useState([]);

  const api = `http://localhost:3000/tasks`;
  const create = `create`;
  const uptade = `update`;
  const deleteParams = `delete`;

  function loadTasks() {
    axios.get(`${api}`).then((response) => {
      setTasks(response.data);
    });
  }

  // Create ---------------------------------------------
  function createNewTask() {
    const title = prompt("task name?");

    if (title) {
      axios
        .post(`${api}/${create}`, {
          title,
        })
        .then(() => {
          loadTasks();
        });
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
        .put(`${api}/${uptade}/${task.id}`, {
          title: editedTask,
        })
        .then(() => {
          loadTasks();
        });
    }
  }

  // Delete ---------------------------------------------
  function deleteTask(id) {
    if (confirm("Delete?")) {
      axios.delete(`${api}/${deleteParams}/${id}`).then(() => {
        loadTasks();
      });
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
