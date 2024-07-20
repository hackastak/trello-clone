"use client";

import { useEffect } from "react";
import Column from "@/components/Column";
import { useBoardStore } from "@/store/BoardStore";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

const Board = () => {
  const [board, getBoard] = useBoardStore((state) => [
    state.board,
    state.getBoard,
  ]);

  useEffect(() => {
    getBoard();
  }, [getBoard]);

  console.log("THIS IS THE BOARD FROM THE BOARD STORE: ", board);

  const handleOnDragEnd = (result: DropResult) => {
    console.log(result);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="board" type="column" direction="horizontal">
        {(provided) => (
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {Array.from(board.columns.entries()).map(([id, column], index) => (
              <Column key={id} id={id} todos={column.todos} index={index} />
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
