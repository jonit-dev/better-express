import { Request, Response } from "express";
import fs from "fs";
import { inject } from "inversify";
import { controller, httpGet, interfaces } from "inversify-express-utils";

import { staticPath } from "../../constants/path.constants";
import { UserService } from "./user.service";

@controller("/users")
export class UserController implements interfaces.Controller {
  constructor(@inject("UserService") private userService: UserService) { }

  @httpGet("/")
  private getUsers(req: Request, res: Response): [] {
    return [];
  }

  @httpGet("/unsubscribe")
  private unsubscribeUser(req: Request, res: Response): any {

    // I decided for readFileSync because sendFile does not work with inversify-js: https://github.com/inversify/InversifyJS/issues/1045
    const html = fs.readFileSync(`${staticPath}/unsubscribe.html`, "utf8");

    return res.send(html);
  }
}

