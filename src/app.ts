import express, { Express } from "express";
import { IUserRepository, InMemoryUserRepository } from "./users/user.repository";
import { UserService } from "./users/user.service";
import { createUserRouter } from "./users/user.routes";

export interface AppInstance {
  app: Express;
  userService: UserService;
  userRepository: IUserRepository;
}

export function createApp(customRepo?: IUserRepository): AppInstance {
  const app = express();
  app.use(express.json());
  console.log('here')

  const userRepository = customRepo ?? new InMemoryUserRepository();
  const userService = new UserService(userRepository);

  app.use("/users", createUserRouter(userService));

  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  return { app, userService, userRepository };
}
