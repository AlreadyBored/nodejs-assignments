export interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

export type CreateUserDTO = Omit<User, "id">;
export type UpdateUserDTO = Partial<CreateUserDTO>;
