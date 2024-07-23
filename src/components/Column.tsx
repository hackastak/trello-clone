
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { TypedColumn, Todo } from "../types";
import TodoCard from "@/components/TodoCard";
import { PlusCircleIcon } from "@heroicons/react/16/solid";

type Props = {
  id: TypedColumn;
  todos: Todo[];
  index: number;
};

const idToColumnText: {
  [key in TypedColumn]: string;
} = {
  "todo": "To Do",
  "inprogress": "In Progress",
  "done": "Done",
};

const Column = ({ id, todos, index }: Props) => {
  console.log("THIS IS THE COLUMN: ", id.toString(), todos, index);
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Droppable droppableId={index.toString()} type="card">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`p-4 bg-gray-100 rounded-md ${snapshot.isDraggingOver ? "bg-green-200" : "bg-white/50"}`}
              >
                <h2 className="flex justify-between font-bold text-xl mb-3">
                  {idToColumnText[id]}
                  <span className="text-gray-500 bg-gray-200 drop-shadow-md rounded-full px-3 py-1 ml-2 text-sm font-normal">{todos.length}</span>
                </h2>
                <div className="space-y-2">
                  {todos.map((todo, index) => (
                    <Draggable
                      key={todo.$id}
                      draggableId={todo.$id}
                      index={index}
                    >
                      {(provided) => (
                        <TodoCard
                          todo={todo}
                          index={index}
                          id={id}
                          innerRef={provided.innerRef}
                          draggableProps={provided.draggableProps}
                          dragHandleProps={provided.dragHandleProps}
                        />
                      )}

                    </Draggable>
                  ))}

                  {provided.placeholder}
                  <div className="flex items-end justify-end p-2">
                    <button className="text-green-500 hover:text-green-600">
                      <PlusCircleIcon className="h-10 w-10" />
                    </button>
                  </div>

                </div>

              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
