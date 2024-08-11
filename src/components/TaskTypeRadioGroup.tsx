"use client";
import { useBoardStore } from "@/store/BoardStore";
import { RadioGroup, Radio } from "@headlessui/react";
import { CheckCircleIcon } from '@heroicons/react/24/solid'

const types = [
  {
    id: "todo",
    name: "To Do",
    description: "A new task to be completed",
    color: "bg-red-500",
  },
  {
    id: "inprogress",
    name: "In Progress",
    description: "A task that is currently being worked on",
    color: "bg-yellow-500",
  },
  {
    id: "done",
    name: "Done",
    description: "A task that has been completed",
    color: "bg-green-500",
  },
];

const TaskTypeRadioGroup = () => {
  const [newTaskType, setNewTaskType] = useBoardStore((state) => [state.newTaskType, state.setNewTaskType]);

  return (
    <div className="w-full py-5">
      <div className="mx-auto w-full max-w-md">
      <RadioGroup value={newTaskType} onChange={setNewTaskType} aria-label="Status" className="space-y-2">
          {types.map((type) => (
            <Radio
              key={type.id}
              value={type.id}
              className="group relative flex cursor-pointer rounded-lg bg-white/5 py-4 px-5 text-black shadow-md transition focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-white/10"
            >
              <div className="flex w-full items-center justify-between">
                <div className="text-sm/6">
                  <p className="font-semibold text-black">{type.name}</p>
                  <div className="flex gap-2 text-black/50">
                    <div>{type.description}</div>
                  </div>

                </div>
                <CheckCircleIcon className="size-6 fill-green-600 opacity-0 transition group-data-[checked]:opacity-100" />
              </div>
            </Radio>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default TaskTypeRadioGroup;