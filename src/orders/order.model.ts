export interface Order {
  id: string;
  userId: string;
  amount: number;
  status: "pending" | "completed" | "cancelled";
  createdAt: string;
}
