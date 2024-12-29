import { TodoSchema } from "../schema/todo-schema";
import { CreateTodoRequest } from "../types";
import database from "../utils/database";
import { Validation } from "../utils/validation";

export class TodoService {
  static async create(userId: string, request: CreateTodoRequest) {
    const todoRequest = Validation.validate(TodoSchema.CREATE, request);

    const newTodo = await database.todo.create({
      data: {
        title: todoRequest.title,
        content: todoRequest.content,
        dueDate: todoRequest.dueDate,
        userId: userId,
      },
    });

    return newTodo;
  }
}
