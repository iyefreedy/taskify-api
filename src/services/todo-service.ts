import { ForbiddenError, NotFoundError } from "../models/http-error";
import TodoSchema from "../schema/todo-schema";
import { CreateTodoRequest, EditTodoRequest } from "../types";
import database from "../core/database";
import { validate } from "../utils/validation";

export class TodoService {
  static async findAll(userId: string) {
    const todos = await database.todo.findMany({
      where: {
        userId: userId,
      },
    });

    return todos;
  }
  static async find(userId: string, todoId: number) {
    const todo = await database.todo.findFirst({
      where: {
        id: todoId,
      },
    });

    if (!todo) {
      throw new NotFoundError("Resource not found");
    }

    if (todo.userId !== userId) {
      throw new ForbiddenError("You are not eligible to access this resource");
    }

    return todo;
  }
  static async create(userId: string, request: CreateTodoRequest) {
    const todoRequest = validate(TodoSchema.CREATE, request);

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

  static async update(
    userId: string,
    todoId: number,
    request: EditTodoRequest
  ) {
    const todoRequest = validate(TodoSchema.UPDATE, request);

    const todo = await database.todo.findFirst({
      where: {
        id: todoId,
        userId: userId,
      },
    });

    if (!todo) {
      throw new NotFoundError("Resource not found");
    }

    const updatedTodo = await database.todo.update({
      where: {
        id: todoId,
      },
      data: {
        title: todoRequest.title,
        content: todoRequest.content,
        dueDate: todoRequest.dueDate,
        done: todoRequest.done,
        userId: userId,
      },
    });

    return updatedTodo;
  }

  static async delete(userId: string, todoId: number) {
    const todo = await database.todo.findFirst({
      where: {
        id: todoId,
        userId: userId,
      },
    });

    if (!todo) {
      throw new NotFoundError("Resource not found");
    }

    await database.todo.delete({
      where: {
        id: todo.id,
      },
    });
  }
}
