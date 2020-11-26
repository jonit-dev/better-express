import { Request, Response } from "express";
import fs from "fs";
import { inject } from "inversify";
import { controller, httpGet, interfaces, queryParam } from "inversify-express-utils";

import { staticPath } from "../../constants/path.constants";
import { EncryptionHelper } from "../../libs/encryption.helper";
import { UserService } from "./user.service";

@controller("/users")
export class UserController implements interfaces.Controller {
  constructor(
    @inject("UserService") private userService: UserService,
    @inject("EncryptionHelper") private encryptionHelper: EncryptionHelper
  ) { }

  @httpGet("/")
  private getUsers(req: Request, res: Response): [] {
    return [];
  }

  @httpGet("/unsubscribe")
  private async unsubscribeUser(@queryParam("hashEmail") hashEmail: string, req: Request, res: Response): Promise<string | Response<any>> {

    if (!hashEmail) {
      return res.status(500).send({
        status: "error",
        message: "No hashEmail provided for unsubscribe function!"
      });
    }
    const email = this.encryptionHelper.decrypt(String(hashEmail));

    try {


      // lets try unsubscribing this user
      await this.userService.unsubscribeUser(email);

      // I decided for readFileSync because sendFile does not work with inversify-js: https://github.com/inversify/InversifyJS/issues/1045
      const html = fs.readFileSync(`${staticPath}/unsubscribe.html`, "utf8");

      return res.send(html);
    } catch (error) {
      console.error(error);
      throw error;
    }



  }
}

