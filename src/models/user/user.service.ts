import { injectable } from "inversify";

@injectable()
export class UserService {
  public getUsers() {
    return [{ id: 1, name: "John" }];
  }
}
