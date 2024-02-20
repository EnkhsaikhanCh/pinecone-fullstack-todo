import { data } from "autoprefixer";
import { useEffect, useState } from "react";
import { AddTask } from "./AddTask";

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
        <AddTask />
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
