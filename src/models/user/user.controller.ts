
import { interfaces, controller, httpGet, httpPost, httpDelete, request, queryParam, response, requestParam } from "inversify-express-utils";
import { injectable, inject } from "inversify";
import { UserService } from "./user.service";
import {Request, Response, NextFunction} from 'express'
import { IUser } from "../../types/user.types";

@controller("/users")
export class UserController implements interfaces.Controller {
    constructor(@inject("UserService") private userService: UserService) {}

    @httpGet("/")
    private index(req: Request, res: Response): IUser[] {
        return this.userService.getUsers();
    }

}