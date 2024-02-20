import { data } from "autoprefixer";
import { useEffect, useState } from "react";

export function Card() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/articles")
      .then((res) => res.json())
      .then((data) => setArticles(data));
  }, []);

  return (
    <div className="container mx-auto my-4 flex justify-center">
      <div className="flex flex-col gap-4">
        <div>
          <button
            className="btn btn-neutral"
            onClick={() => document.getElementById("my_modal_2").showModal()}
          >
            Add Task
          </button>
          <dialog id="my_modal_2" className="modal">
            <div className="modal-box">
              <h3 className="text-lg font-bold">Hello!</h3>
              <p className="py-4">Press ESC key or click outside to close</p>
              <div className="modal-action">
                <form method="dialog" className="flex gap-2">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-neutral">Close</button>
                  <button className="btn btn-primary">Add Task</button>
                </form>
              </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </div>
        {articles.map((article) => (
          <div
            key={article.id}
            className="item-center card flex h-[70px] w-[600px] justify-center border border-slate-700 shadow"
          >
            <div className="mx-8 flex gap-2">
              <div className="flex flex-1 items-center text-xl text-white">
                {article.title}
              </div>
              <div className="flex flex-1 items-center text-xl text-white">
                {article.desc}
              </div>
              <button className="btn btn-sm">edit</button>
              <button className="btn btn-sm">delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
