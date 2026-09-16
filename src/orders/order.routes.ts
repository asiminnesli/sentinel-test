import { Router, Request, Response } from "express";
import { OrderService } from "./order.service";

export function createOrderRouter(orderService: OrderService): Router {
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

  return router;
}
