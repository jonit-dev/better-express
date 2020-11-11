import { injectable } from "inversify";

import { IUser, User } from "./user.model";

@injectable()
export class UserRepository {
  public async create(): Promise<IUser> {
    const user = new User({
      name: "Joao",
      email: "test@gmail.com",
    } as IUser);
    await user.save();

    return user;
  }
}
