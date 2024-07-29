"use client";
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useBoardStore } from '@/store/BoardStore';
import { useModalStore } from '@/store/ModalStore';
import TaskTypeRadioGroup from "./TaskTypeRadioGroup";

function Modal() {
  const [newTaskInput, setNewTaskInput] = useBoardStore((state) => [state.newTaskInput, state.setNewTaskInput]);
  const [isOpen, closeModal] = useModalStore((state) => [state.isOpen, state.closeModal]);

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={closeModal}
        transition
        className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-[closed]:opacity-0"
      >
        <DialogPanel className="max-w-lg space-y-4 bg-white p-4 rounded-lg w-[400px]">
          <DialogTitle className="font-bold">Add New Task</DialogTitle>
          <input className="outline outline-black p-1 w-full rounded-md" type="text" value={newTaskInput} onChange={(e) => setNewTaskInput(e.target.value)} />
          <TaskTypeRadioGroup />
          {/* <select name="status" id="status">
            <option value="todo">To Do</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
          </select> */}
          <div className="flex gap-4">
            <button>Add Task</button>
            <button onClick={closeModal}>Cancel</button>
          </div>
        </DialogPanel>
      </Dialog>
    </>
  )
}

export default Modal;