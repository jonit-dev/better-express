import { injectable } from "inversify";

import { UserCreateDTO } from "./user.dto";
import { IUser, User } from "./user.model";

@injectable()
export class UserRepository {
  public async create(userCreateDTO: UserCreateDTO): Promise<IUser> {
    const { name, email, password } = userCreateDTO;

    const user = new User({
      name,
      email,
      password,
    } as IUser);
    await user.save();

    return user;
  }
}
