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
      user?: User;
    }
  }
}
