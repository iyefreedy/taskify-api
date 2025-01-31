import { User } from "@prisma/client";

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
      user: Omit<User, "password">;
    }
  }
}
