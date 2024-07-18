"use client";

import { useBoardStore } from "@/store/BoardStore";
import { useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";


function Board() {
   const getBoard = useBoardStore((state) => state.getBoard);

  useEffect(() => {
    getBoard();
  }, [getBoard]);
    
  return (
    <h1>HELLO</h1>
    // <DragDropContext>
    //   <Droppable droppableId="board" type="column" direction="horizontal">
    //     {(provided) => (
    //       <div ref={provided.innerRef} {...provided.droppableProps}>
    //         {provided.placeholder}
    //       </div>
    //     )}
    //   </Droppable>
    // </DragDropContext>
  );
}

export default Board;
