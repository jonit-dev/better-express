import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet, httpPost, interfaces, requestBody } from "inversify-express-utils";

import { DTOValidator } from "../../middlewares/validator.middleware";
import { UserCreateDTO } from "./user.dto";
import { IUser } from "./user.model";
import { UserService } from "./user.service";

@controller("/users")
export class UserController implements interfaces.Controller {
  constructor(@inject("UserService") private userService: UserService) {}

  @httpGet("/")
  private getUsers(req: Request, res: Response): IUser[] {
    return this.userService.getUsers();
  }

  @httpPost("/", DTOValidator(UserCreateDTO))
  private async createUser(
    @requestBody() body,
    req: Request,
    res: Response
  ): Promise<IUser> {
    return await this.userService.createUser(body);
  }
}
