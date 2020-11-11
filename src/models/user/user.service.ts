import { Response } from "express";
import { inject, injectable } from "inversify";

import { Conflict } from "../../errors/Conflict";
import { UserCreateDTO } from "./user.dto";
import { IUser, User } from "./user.model";
import { UserRepository } from "./user.repository";

@injectable()
export class UserService {
  constructor(
    @inject("UserRepository") private userRepository: UserRepository
  ) {}

  public async createUser(
    res: Response,
    userCreateDTO: UserCreateDTO
  ): Promise<IUser> {
    const { email } = userCreateDTO;
    // check if user already exist
    const foundUser = await User.findOne({ email });

    if (foundUser) {
      throw new Conflict(
        "User already exists: This e-mail is already registered"
      );
    }

    return this.userRepository.create(userCreateDTO);
  }

  public getUsers(): IUser[] {
    return [];
  }
}
