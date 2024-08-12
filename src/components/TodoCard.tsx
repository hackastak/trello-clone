"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { DraggableProvidedDraggableProps, DraggableProvidedDragHandleProps } from "@hello-pangea/dnd";
import { Todo, TypedColumn } from "@/types";
import { getUrl } from "@/lib/getUrl";
import { useBoardStore } from "@/store/BoardStore";
import { TrashIcon } from "@heroicons/react/16/solid";

type Props = {
  todo: Todo;
  index: number;
  id: TypedColumn;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
}

function TodoCard({ todo, index, id, innerRef, draggableProps, dragHandleProps }: Props) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const deleteTask = useBoardStore((state) => state.deleteTask);

  useEffect(() => {
    if (todo.image) {
      console.log("FETCHING IMAGE: ", todo.image);
      const fetchImage = async () => {
        const url = await getUrl(todo.image!);
        if (url) {
          setImageUrl(url.toString());
        }
      }
      fetchImage();
    }
  }, [todo]);
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
          <TrashIcon className="ml-5 h-6 w-6" />
        </button>
      </div>
      {imageUrl && (
        <div className="relative h-full w-full rounded-b-md">
          <Image
            src={imageUrl}
            alt="Task Image"
            width={400}
            height={200}
            className="w-full object-contain rounded-b-md"
          />
        </div>
      )}
    </div>
  );
}

export default TodoCard;
