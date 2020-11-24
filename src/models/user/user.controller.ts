import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet, interfaces } from "inversify-express-utils";

import { AuthMiddleware } from "../../middlewares/auth.middleware";
import { UserService } from "./user.service";

@controller("/users", AuthMiddleware)
export class UserController implements interfaces.Controller {
  constructor(@inject("UserService") private userService: UserService) { }

  @httpGet("/")
  private getUsers(req: Request, res: Response): [] {
    return [];
  }
}
