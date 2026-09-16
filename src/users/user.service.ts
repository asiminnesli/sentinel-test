import { IUserRepository } from "./user.repository";
import { User } from "./user.model";

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  public async getUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  public async getUserById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  public async createUser(data: { name: string; email: string }): Promise<User> {
    if (!data.name || !data.email) {
      throw new Error("Name and email are required");
    }
    return this.userRepository.create(data);
  }
}
