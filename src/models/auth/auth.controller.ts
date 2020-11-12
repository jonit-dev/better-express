import { inject } from 'inversify';
import { controller, httpPost, interfaces } from 'inversify-express-utils';
import passport from 'passport';

import { AuthMiddleware } from '../../middlewares/auth.middleware';
import { DTOValidator } from '../../middlewares/validator.middleware';
import { IUser } from '../user/user.model';
import { AuthLoginDTO, AuthSignUpDTO } from './auth.dto';
import { AuthService } from './auth.service';

@controller('/auth')
export class AuthController implements interfaces.Controller {
  constructor(@inject('AuthService') private authService: AuthService) {}

  @httpPost(
    '/signup',
    DTOValidator(AuthSignUpDTO),
    passport.authenticate('signup', { session: false })
  )
  public async signUp(req, res, next): Promise<IUser> {
    return req.user;
  }

  @httpPost('/login', DTOValidator(AuthLoginDTO), AuthMiddleware.login)
  public async login(): Promise<any> {}
}
