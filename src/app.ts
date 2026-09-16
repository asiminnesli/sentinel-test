import express, { Express } from "express";
import { IUserRepository, InMemoryUserRepository } from "./users/user.repository";
import { UserService } from "./users/user.service";
import { createUserRouter } from "./users/user.routes";
import { IOrderRepository, InMemoryOrderRepository } from "./orders/order.repository";
import { OrderService } from "./orders/order.service";
import { createOrderRouter } from "./orders/order.routes";

export interface AppInstance {
  app: Express;
  userService: UserService;
  userRepository: IUserRepository;
  orderService: OrderService;
  orderRepository: IOrderRepository;
}

export function createApp(
  customUserRepo?: IUserRepository,
  customOrderRepo?: IOrderRepository,
): AppInstance {
  const app = express();
  app.use(express.json());
  console.log('here')

  const userRepository = customUserRepo ?? new InMemoryUserRepository();
  const userService = new UserService(userRepository);

  const orderRepository = customOrderRepo ?? new InMemoryOrderRepository();
  const orderService = new OrderService(orderRepository);

  app.use("/users", createUserRouter(userService));
  app.use("/orders", createOrderRouter(orderService));

  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  return { app, userService, userRepository, orderService, orderRepository };
}
