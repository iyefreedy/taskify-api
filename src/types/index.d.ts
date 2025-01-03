import { User } from "@prisma/client";

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

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

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      JWT_SECRET: string;
      JWT_EXPIRES_IN: string;
      JWT_ISSUER: string;
    }
  }

  namespace Express {
    interface Request {
      user?: Omit<User, "password">;
    }
  }
}
