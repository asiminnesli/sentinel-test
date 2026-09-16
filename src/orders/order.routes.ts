import { Router, Request, Response } from "express";
import { OrderService } from "./order.service";
import { IOrderRepository } from "./order.repository";

export function createOrderRouter(
  orderService: OrderService,
  orderRepository: IOrderRepository,
): Router {
  const router = Router();

  // GET /orders
  router.get("/", async (_req: Request, res: Response) => {
    try {
      const orders = await orderService.getOrders();
      res.json({ orders });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  });

  // GET /orders/:id
  router.get("/:id", async (req: Request, res: Response) => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const order = await orderService.getOrderById(id);
      if (!order) {
        res.status(404).json({ error: "Order not found" });
        return;
      }
      res.json({ order });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch order" });
    }
  });

  // POST /orders — Business logic directly inside route handler, bypassing OrderService
  router.post("/", async (req: Request, res: Response) => {
    try {
      const { userId, amount, status } = req.body;

      // Direct business logic validation in route handler
      if (!userId || amount === undefined || typeof amount !== "number" || amount < 0) {
        res.status(400).json({ error: "Valid userId and non-negative amount are required" });
        return;
      }

      // Direct call to repository, bypassing OrderService
      const order = await orderRepository.create({
        userId,
        amount,
        status: status ?? "pending",
      });

      res.status(201).json({ order });
    } catch (error) {
      res.status(500).json({ error: "Failed to create order" });
    }
  });

  return router;
}
