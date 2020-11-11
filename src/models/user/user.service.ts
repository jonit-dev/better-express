import { inject, injectable } from "inversify";

import { IUser } from "./user.model";
import { UserRepository } from "./user.repository";

@injectable()
export class UserService {
  constructor(
    @inject("UserRepository") private userRepository: UserRepository
  ) {}

  public async createUser(): Promise<IUser> {
    return this.userRepository.create();
  }

  public getUsers(): IUser[] {
    return [];
  }
}
