import { IOrderRepository } from "./order.repository";
import { Order } from "./order.model";

export class OrderService {
  constructor(private orderRepository: IOrderRepository) {}

  public async getOrders(): Promise<Order[]> {
    return this.orderRepository.findAll();
  }

  public async getOrderById(id: string): Promise<Order | null> {
    return this.orderRepository.findById(id);
  }

  public async createOrder(data: {
    userId: string;
    amount: number;
    status?: "pending" | "completed" | "cancelled";
  }): Promise<Order> {
    if (!data.userId || data.amount === undefined || data.amount < 0) {
      throw new Error("Valid userId and non-negative amount are required");
    }
    return this.orderRepository.create({
      userId: data.userId,
      amount: data.amount,
      status: data.status ?? "pending",
    });
  }
}
