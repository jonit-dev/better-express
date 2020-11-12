import { Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpPost, interfaces, requestBody } from 'inversify-express-utils';
import jwt from 'jsonwebtoken';

import { appEnv } from '../../config/env';
import { ForbiddenError } from '../../errors/ForbiddenError';
import { UnauthorizedError } from '../../errors/UnauthorizedError';
import { AuthRoute } from '../../middlewares/auth.middleware';
import { DTOValidator } from '../../middlewares/validator.middleware';
import { HttpStatusCode, IRequestCustom } from '../../types/express.types';
import { IUser } from '../user/user.model';
import { AuthLoginDTO, AuthRefreshTokenDTO, AuthSignUpDTO } from './auth.dto';
import { AuthService } from './auth.service';
import { IAuthRefreshTokenResponse, IAuthResponse } from './auth.types';

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
    const { user } = req;

    if (!user) {
      throw new UnauthorizedError('You cannot access this route');
    }

    this.authService.logout(user, refreshToken);

    return res.status(HttpStatusCode.OK).send();
  }

  @httpPost('/refresh-token', DTOValidator(AuthRefreshTokenDTO), AuthRoute)
  public async refreshToken(
    req: IRequestCustom,
    res: Response
  ): Promise<IAuthRefreshTokenResponse | void> {
    const { refreshToken } = req.body;

    const { user } = req;

    if (!user) {
      throw new UnauthorizedError('You cannot access this route.');
    }

    if (!refreshToken) {
      throw new UnauthorizedError(
        "You're not allowed to access this resource!"
      );
    }

    console.log(user);

    if (!user.refreshTokens!.find((item) => item.token === refreshToken)) {
      throw new ForbiddenError('Error: Your refreshToken is invalid');
    }

    jwt.verify(
      refreshToken,
      appEnv.authentication.REFRESH_TOKEN_SECRET,
      (err, user: IUser) => {
        if (err) {
          throw new ForbiddenError('Error: Your refreshToken is invalid');
        }

        // provide a new accessToken to the user
        const accessToken = jwt.sign(
          { _id: user._id, email: user.email },
          appEnv.authentication.JWT_SECRET,
          { expiresIn: '20m' }
        );

        return res.status(HttpStatusCode.OK).send({
          accessToken,
        });
      }
    );
  }
}
