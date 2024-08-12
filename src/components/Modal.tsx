"use client";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import Image from "next/image";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useBoardStore } from "@/store/BoardStore";
import { useModalStore } from "@/store/ModalStore";
import TaskTypeRadioGroup from "./TaskTypeRadioGroup";

function Modal() {
  const [
    newTaskInput,
    setNewTaskInput,
    newTaskType,
    setNewTaskType,
    image,
    setImage,
    addTask,
  ] = useBoardStore((state) => [
    state.newTaskInput,
    state.setNewTaskInput,
    state.newTaskType,
    state.setNewTaskType,
    state.image,
    state.setImage,
    state.addTask,
  ]);
  const [isOpen, closeModal] = useModalStore((state) => [
    state.isOpen,
    state.closeModal,
  ]);

  const onDrop = useCallback((acceptedFiles) => {
    setImage(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSubmitNewTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTaskInput) return;

    addTask(newTaskInput, newTaskType, image);
    setImage(null);
    closeModal();
  };

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
          <form onSubmit={handleSubmitNewTask}>
            <input
              className="outline outline-black p-1 w-full rounded-md"
              type="text"
              value={newTaskInput}
              onChange={(e) => setNewTaskInput(e.target.value)}
            />
            <TaskTypeRadioGroup />
            {!image && (
              <div
                {...getRootProps()}
                className=" flex flex-col justify-center items-center bg-gray-100 p-4 rounded-md outline-dashed outline-blue-600"
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p className="text-center">Drop the image here ...</p>
                ) : (
                  <p className="text-center">
                    Drag 'n' drop an image here, or click to select an image.
                  </p>
                )}
              </div>
            )}
            {image && (
              <div className="flex justify-between items-center">
                <div>
                  <Image src={URL.createObjectURL(image)} width={200} height={200} alt="Task Image" />
                </div>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => setImage(null)}
                >
                  Remove
                </button>
              </div>
            )}
            <div className="flex gap-4 mt-4">
              <button
                className="bg-blue-600 text-white transition-all duration-300 hover:bg-blue-500 hover:scale-110 hover:shadow-lg rounded-lg px-3 py-1"
                type="submit"
              >
                Add Task
              </button>
              <button className="underline" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </form>
        </DialogPanel>
      </Dialog>
    </>
  );
}

export default Modal;
