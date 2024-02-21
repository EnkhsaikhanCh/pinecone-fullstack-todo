import axios from "axios";
import { useEffect, useState } from "react";

export function Card() {
  const [tasks, setTasks] = useState([]);

  function loadTasks() {
    axios.get("http://localhost:3000/tasks").then((response) => {
      setTasks(response.data);
    });
  }

  useEffect(() => {
    loadTasks();
  }, []);

  function createNewTask() {
    const title = prompt("task name?");

    if (!title) {
      alert("fill title!");
      return;
    }

    axios
      .post("http://localhost:3000/tasks/create", {
        title,
      })
      .then(() => {
        loadTasks();
      });
  }

  function editTask() {
    const name = prompt("Task name?");
    console.log(name);
  }

  function deleteTask(id) {
    if (confirm("Delete?")) {
      axios.delete(`http://localhost:3000/tasks/delete/${id}`).then(() => {
        loadTasks();
      });
    }
  }

  return (
    <div className="container mx-auto my-4 flex justify-center">
      <div className="flex flex-col gap-4">
        <div>
          <button
            className="btn btn-primary mb-2 text-lg"
            onClick={createNewTask}
          >
            New task
          </button>
        </div>
        {tasks.map((task) => (
          <div
            key={task.id}
            className="item-center card flex h-[70px] w-[600px] justify-center rounded-md border border-slate-700 shadow"
          >
            <div className="mx-8 flex items-center gap-2 text-xl">
              <div className="flex-1 text-white">{task.title}</div>
              <button className="btn btn-sm" onClick={() => editTask(task.id)}>
                edit
              </button>
              <button
                className="btn btn-sm"
                onClick={() => deleteTask(task.id)}
              >
                delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
