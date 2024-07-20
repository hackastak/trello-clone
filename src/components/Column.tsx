import { Draggable, Droppable } from "react-beautiful-dnd";
import { TypedColumn, Todo } from "@/types";

type Props = {
  id: TypedColumn;
  todos: Todo[];
  index: number;
};

const Column = ({ id, todos, index }: Props) => {
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
                className={`p-4 bg-gray-100 rounded-md ${
                  snapshot.isDraggingOver ? "bg-green-20" : "bg-white/50"
                }`}
              >
                <h2>{id}</h2>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
