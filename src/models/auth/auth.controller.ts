import { Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpPost, interfaces, requestBody } from 'inversify-express-utils';

import { DTOValidator } from '../../middlewares/validator.middleware';
import { AuthLoginDTO, AuthSignUpDTO } from './auth.dto';
import { AuthService } from './auth.service';
import { IAuthResponse } from './auth.types';

@controller('/auth')
export class AuthController implements interfaces.Controller {
  constructor(@inject('AuthService') private authService: AuthService) {}

  @httpPost('/signup', DTOValidator(AuthSignUpDTO))
  public async signUp(
    @requestBody() authSignUpDTO,
    req: Request,
    res: Response
  ): Promise<any> {
    return this.authService.signUp(authSignUpDTO);
  }

  @httpPost('/login', DTOValidator(AuthLoginDTO))
  public async login(
    @requestBody() authLoginDTO,
    req: Request,
    res: Response
  ): Promise<IAuthResponse> {
    const accessToken = await this.authService.login(authLoginDTO);

    return {
      accessToken,
    };
  }
}
