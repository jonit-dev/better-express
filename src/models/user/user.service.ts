import { inject, injectable } from "inversify";

import { UserCreateDTO } from "./user.dto";
import { IUser } from "./user.model";
import { UserRepository } from "./user.repository";

@injectable()
export class UserService {
  constructor(
    @inject("UserRepository") private userRepository: UserRepository
  ) {}

  public async createUser(userCreateDTO: UserCreateDTO): Promise<IUser> {
    return this.userRepository.create(userCreateDTO);
  }

  public getUsers(): IUser[] {
    return [];
  }
}
