import { Order } from "./order.model";

export interface IOrderRepository {
  findAll(): Promise<Order[]>;
  findById(id: string): Promise<Order | null>;
  create(order: Omit<Order, "id" | "createdAt">): Promise<Order>;
}

export class InMemoryOrderRepository implements IOrderRepository {
  private orders: Map<string, Order> = new Map();

  constructor() {
    this.seedInitialOrders();
  }

  private seedInitialOrders(): void {
    const initialOrders: Omit<Order, "createdAt">[] = [
      { id: "ord_001", userId: "usr_001", amount: 99.99, status: "completed" },
      { id: "ord_002", userId: "usr_002", amount: 149.5, status: "pending" },
      { id: "ord_003", userId: "usr_001", amount: 29.0, status: "completed" },
    ];

    for (const o of initialOrders) {
      this.orders.set(o.id, {
        ...o,
        createdAt: new Date().toISOString(),
      });
    }
  }

  public async findAll(): Promise<Order[]> {
    return Array.from(this.orders.values()).map((order) => ({ ...order }));
  }

  public async findById(id: string): Promise<Order | null> {
    const order = this.orders.get(id);
    return order ? { ...order } : null;
  }

  public async create(orderData: Omit<Order, "id" | "createdAt">): Promise<Order> {
    const id = `ord_${String(this.orders.size + 1).padStart(3, "0")}`;
    const newOrder: Order = {
      ...orderData,
      id,
      createdAt: new Date().toISOString(),
    };
    this.orders.set(id, newOrder);
    return { ...newOrder };
  }
}

export const OrderRepository = InMemoryOrderRepository;
export type OrderRepository = InMemoryOrderRepository;
