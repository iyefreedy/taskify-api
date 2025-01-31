export type CreateTodoRequest = {
  title: string;
  content?: string;
  dueDate?: Date;
};

export type EditTodoRequest = {
  title?: string;
  content?: string;
  dueDate?: Date;
  done?: boolean;
};
