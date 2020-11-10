import { injectable } from "inversify";

import { IUser } from "../../types/user.types";

@injectable()
export class UserService {
  public getUsers(): IUser[] {
    return [{ id: 1, name: "John" }];
  }
}
