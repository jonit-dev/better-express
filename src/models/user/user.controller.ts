import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet, interfaces } from "inversify-express-utils";

import { IUser } from "../../types/user.types";
import { UserService } from "./user.service";

@controller("/users")
export class UserController implements interfaces.Controller {
  constructor(@inject("UserService") private userService: UserService) {}

  @httpGet("/")
  private getUsers(req: Request, res: Response): IUser[] {
    return this.userService.getUsers();
  }
}
