import { Board } from "@/types";
import formatTodosForAI from "@/lib/formatTodosForAI";

const fetchSuggestion = async (board: Board) => {
  const todos = formatTodosForAI(board);
  const response = await fetch("/api/generateSummary", {
    method: "POST",
    body: JSON.stringify({ todos }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const GPTdata = await response.json();
  const { content } = GPTdata;
  return content;
}

export default fetchSuggestion;