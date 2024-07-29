import { NextResponse } from "next/server";
import openai from "@/openai";

export async function POST(request: Request) {
  // todos in the body of the POST request
  const { todos } = await request.json();
   // communicate with openAI GPT
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    temperature: 0.8,
    n: 1,
    stream: false,
    messages: [
      {
        role: "system",
        content: `When responding, welcome the user always as Mr. Hunter and say welcome to the Hackastak Todo App! Limit the response to 200 characters`,
      },
      {
        role: "user",
        content: `Hi there, provide a summary of the following todos. Count how many todos are in each category such as To Do, In Progress, and Done, then tell the user to have a productive day! here's the data: ${JSON.stringify(todos)}`,
      },
    ]
  });
  return NextResponse.json(response.choices[0].message);
}