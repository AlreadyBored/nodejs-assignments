import { create } from "node:domain";
import { v4 as uuidv4 } from "uuid";
import { User } from "../types/users";

const users: Record<string, User> = {};
export const MemoryDB = {
  async create(userData: Omit<User, "id">): Promise<User> {
    const id = uuidv4();
    const newUser: User = {
      id,
      username: userData.username,
      age: userData.age,
      hobbies: userData.hobbies || [],
    };
    users[id] = newUser;
    return newUser;
  },

  async findOne(id: string): Promise<User | undefined> {
    return users[id] || undefined;
  },

  async findAll(): Promise<User[]> {
    return Object.values(users);
  },
  async update(
    id: string,
    updates: Partial<Omit<User, "id">>
  ): Promise<User | undefined> {
    if (!users[id]) {
      return undefined;
    }
    users[id] = {
      ...users[id],
      ...updates,
    };
    return users[id];
  },
  async delete(id: string): Promise<boolean> {
    if (!users[id]) return false;
    delete users[id];
    return true;
  },
};
