import { Response } from 'express';
import { inject } from 'inversify';
import { controller, httpPost, interfaces, requestBody } from 'inversify-express-utils';

import { InternalServerError } from '../../errors/InternalServerError';
import { AuthRoute } from '../../middlewares/auth.middleware';
import { DTOValidator } from '../../middlewares/validator.middleware';
import { HttpStatusCode, IRequestCustom } from '../../types/express.types';
import { AuthLoginDTO, AuthRefreshTokenDTO, AuthSignUpDTO } from './auth.dto';
import { AuthService } from './auth.service';
import { IAuthRefreshTokenResponse, IAuthResponse } from './auth.types';

@controller('/auth')
export class AuthController implements interfaces.Controller {
  constructor(@inject('AuthService') private authService: AuthService) {}

  @httpPost('/signup', DTOValidator(AuthSignUpDTO))
  public async signUp(@requestBody() authSignUpDTO): Promise<any> {
    return this.authService.signUp(authSignUpDTO);
  }

  @httpPost('/login', DTOValidator(AuthLoginDTO))
  public async login(@requestBody() authLoginDTO): Promise<IAuthResponse> {
    const { accessToken, refreshToken } = await this.authService.login(
      authLoginDTO
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  @httpPost('/logout', DTOValidator(AuthRefreshTokenDTO), AuthRoute)
  public async logout(
    @requestBody() authRefreshTokenDTO,
    req: IRequestCustom,
    res: Response
  ): Promise<any> {
    const { refreshToken } = authRefreshTokenDTO;

    const user = req.user!;

    this.authService.logout(user, refreshToken);

    return res.status(HttpStatusCode.OK).send();
  }

  @httpPost('/refresh-token', DTOValidator(AuthRefreshTokenDTO), AuthRoute)
  public async refreshToken(
    req: IRequestCustom,
    res
  ): Promise<IAuthRefreshTokenResponse> {
    // These variables will always be defined, since we have the DTO validation that happens before the code below.
    const refreshToken = req.body.refreshToken!;
    const user = req.user!;

    const accessToken = await this.authService.refreshToken(user, refreshToken);

    if (!accessToken) {
      throw new InternalServerError(
        'Error while trying to generate your access token!'
      );
    }

    return res.status(HttpStatusCode.OK).send({
      accessToken,
    });
  }
}
