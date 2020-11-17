import { Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpGet, interfaces } from 'inversify-express-utils';

import { AuthRoute } from '../../middlewares/auth.middleware';
import { IUser } from './user.model';
import { UserService } from './user.service';

@controller('/users', AuthRoute)
export class UserController implements interfaces.Controller {
  constructor(@inject('UserService') private userService: UserService) {}

  @httpGet('/foda-se')
  private getUsers(req: Request, res: Response): IUser[] {
    return [];
  }
}
