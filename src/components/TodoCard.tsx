"use client";

import { DraggableProvidedDraggableProps, DraggableProvidedDragHandleProps } from "@hello-pangea/dnd";
import { Todo, TypedColumn } from "@/types";
import { useBoardStore } from "@/store/BoardStore";
import { XCircleIcon } from "@heroicons/react/16/solid";

type Props = {
  todo: Todo;
  index: number;
  id: TypedColumn;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
}

function TodoCard({ todo, index, id, innerRef, draggableProps, dragHandleProps }: Props) {
  const deleteTask = useBoardStore((state) => state.deleteTask);
  return (
    <div
      ref={innerRef}
      {...draggableProps}
      {...dragHandleProps}
      className="p-2 bg-white rounded-md space-y-2 drop-shadow-md"
    >
      <div className="flex justify-between">
        <p>{todo.title}</p>
        <button className="text-red-500 hover:text-red-700" onClick={() => deleteTask(index, todo, id)}>
          <XCircleIcon className="ml-5 h-8 w-8" />
        </button>
      </div>
    </div>
  );
}

export default TodoCard;