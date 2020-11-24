import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet, httpPost, interfaces, requestBody } from "inversify-express-utils";

import { InternalServerError } from "../../errors/InternalServerError";
import { AuthMiddleware } from "../../middlewares/auth.middleware";
import { DTOValidatorMiddleware } from "../../middlewares/validator.middleware";
import { HttpStatusCode, IRequestCustom } from "../../types/express.types";
import { IGoogleOAuthUrlResponse, IGoogleOAuthUserInfoResponse } from "../../types/googleOAuth.types";
import { IUser } from "../user/user.model";
import { AuthLoginDTO, AuthRefreshTokenDTO, AuthSignUpDTO } from "./auth.dto";
import { AuthService } from "./auth.service";
import { IAuthRefreshTokenResponse, IAuthResponse } from "./auth.types";

@controller("/auth")
export class AuthController implements interfaces.Controller {
  constructor(@inject("AuthService") private authService: AuthService) { }


  // GOOGLE FLOW ========================================

  @httpGet("/google/url")
  public async generateGoogleOAuthUrl(
    req: Request,
    res: Response
  ): Promise<Response<IGoogleOAuthUrlResponse>> {
    const googleOAuthUrl = await this.authService.generateGoogleOAuthUrl();
    return res.status(200).send({
      googleOAuthUrl,
    });
  }

  @httpGet("/google/redirect")
  public async googleOAuthRedirect(
    req: Request,
    res: Response
  ): Promise<IAuthResponse> {
    const { code, scope } = req.query;

    const googleUserInfo: IGoogleOAuthUserInfoResponse = await this.authService.getGoogleUser(
      String(code)
    );

    const {
      accessToken,
      refreshToken,
    } = await this.authService.googleOAuthSync(googleUserInfo);

    return {
      accessToken,
      refreshToken,
    };
  }

  // JWT FLOW ========================================

  @httpPost("/signup", DTOValidatorMiddleware(AuthSignUpDTO))
  public async signUp(@requestBody() authSignUpDTO): Promise<IUser> {
    return this.authService.signUp(authSignUpDTO);
  }

  @httpPost("/login", DTOValidatorMiddleware(AuthLoginDTO))
  public async login(@requestBody() authLoginDTO): Promise<IAuthResponse> {
    const { accessToken, refreshToken } = await this.authService.login(
      authLoginDTO
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  @httpPost("/logout", DTOValidatorMiddleware(AuthRefreshTokenDTO), AuthMiddleware)
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

  @httpPost("/refresh-token", DTOValidatorMiddleware(AuthRefreshTokenDTO), AuthMiddleware)
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
        "Error while trying to generate your access token!"
      );
    }

    return res.status(HttpStatusCode.OK).send({
      accessToken,
    });
  }
}
