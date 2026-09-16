import { User } from "./user.model";

export interface IUserRepository {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  create(user: Omit<User, "id" | "createdAt">): Promise<User>;
}

export class InMemoryUserRepository implements IUserRepository {
  private users: Map<string, User> = new Map();

  constructor() {
    this.seedInitialUsers();
  }

  private seedInitialUsers(): void {
    const initialUsers: Omit<User, "createdAt">[] = [
      { id: "usr_001", name: "Alice Johnson", email: "alice@example.com" },
      { id: "usr_002", name: "Bob Smith", email: "bob@example.com" },
      { id: "usr_003", name: "Charlie Brown", email: "charlie@example.com" },
    ];

    for (const u of initialUsers) {
      this.users.set(u.id, {
        ...u,
        createdAt: new Date().toISOString(),
      });
    }
  }

  public async findAll(): Promise<User[]> {
    return Array.from(this.users.values()).map((user) => ({ ...user }));
  }

  public async findById(id: string): Promise<User | null> {
    const user = this.users.get(id);
    return user ? { ...user } : null;
  }

  public async create(userData: Omit<User, "id" | "createdAt">): Promise<User> {
    const id = `usr_${String(this.users.size + 1).padStart(3, "0")}`;
    const newUser: User = {
      ...userData,
      id,
      createdAt: new Date().toISOString(),
    };
    this.users.set(id, newUser);
    return { ...newUser };
  }
}

// Default export / alias for UserRepository
export const UserRepository = InMemoryUserRepository;
export type UserRepository = InMemoryUserRepository;
