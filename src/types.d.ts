import { Models } from "appwrite";

interface Board {
  columns: Map<TypedColumn, Column>;
}

type TypedColumn = "todo" | "in-progress" | "done";

interface Column {
  id: TypedColumn;
  todos: Todo[];
}

interface Todo extends Models.Document{
  $id: string;
  $createdAt: string;
  title: string;
  status: TypedColumn;
  iamge?: string;
}

interface Image {
  bucketId: string;
  fileId: string;
}