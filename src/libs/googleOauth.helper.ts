import axios from "axios";
import { google } from "googleapis";
import { injectable } from "inversify";

import { appEnv } from "../config/env";
import { InternalServerError } from "../errors/InternalServerError";
import { IGoogleConfig, IGoogleOAuthTokenPayload } from "../types/googleOAuth.types";

@injectable()
export class GoogleOAuthHelper {
  private googleConfig: IGoogleConfig = {
    clientID: appEnv.authentication.googleOAuth.GOOGLE_CLIENT_ID!,
    clientSecret: appEnv.authentication.googleOAuth.GOOGLE_SECRET!,
    redirectURI: `${appEnv.general.APP_URL!}/auth/google/redirect`,
  };

  private defaultScope = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
  ];

  /**
   * Create the google auth object which gives us access to talk to google's apis.
   */
  private createConnection(): any {
    return new google.auth.OAuth2(
      this.googleConfig.clientID,
      this.googleConfig.clientSecret,
      this.googleConfig.redirectURI
    );
  }

  /**
   * Get a url which will open the google sign-in page and request access to the scope provided (such as calendar events).
   */
  private getConnectionUrl(auth): any {
    return auth.generateAuthUrl({
      access_type: "offline",
      prompt: "consent", // access type and approval prompt will force a new refresh token to be made each time signs in
      scope: this.defaultScope,
    });
  }

  public async getAccessTokenFromCode(
    code: string
  ): Promise<IGoogleOAuthTokenPayload> {
    const { data } = await axios({
      url: "https://oauth2.googleapis.com/token",
      method: "post",
      data: {
        client_id: this.googleConfig.clientID,
        client_secret: this.googleConfig.clientSecret,
        redirect_uri: this.googleConfig.redirectURI,
        grant_type: "authorization_code",
        code,
      },
    });
    // { access_token, expires_in, token_type, refresh_token }
    return data;
  }

  /**
   * Create the google url to be sent to the client.
   */
  public urlGoogle(): string {
    const auth = this.createConnection(); // this is from previous step
    const url = this.getConnectionUrl(auth);
    return url;
  }

  public async getGoogleUser(code: string): Promise<any> {
    const payload: IGoogleOAuthTokenPayload = await this.getAccessTokenFromCode(
      code
    );

    // Fetch the user's profile with the access token and bearer
    const googleUser = await axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${payload.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${payload.id_token}`,
          },
        }
      )
      .then((res) => res.data)
      .catch((error) => {
        throw new InternalServerError(error.message);
      });

    return googleUser;
  }
}
