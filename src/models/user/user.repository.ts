import { injectable } from "inversify";

import { NotFoundError } from "../../errors/NotFoundError";
import { IUser, User } from "./user.model";

@injectable()
export class UserRepository {

  public async findUser(params: object): Promise<IUser> {

    const user = await User.findOne(params);

    if (!user) {
      throw new NotFoundError("User not found!");
    }

    return user;


  }


}
