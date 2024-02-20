export function AddTask() {
  return (
    <div>
      <button
        className="btn btn-neutral"
        onClick={() => document.getElementById("my_modal_2").showModal()}
      >
        Add Task
      </button>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="mb-4 text-2xl font-bold">Hello!</h3>
          <form action="" className="flex w-full flex-col gap-2">
            <input
              type="text"
              placeholder="Title"
              className="input input-bordered"
            />
            <textarea
              rows={3}
              placeholder="Description"
              className="textarea textarea-bordered resize-none"
            ></textarea>
          </form>

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
  );
}
