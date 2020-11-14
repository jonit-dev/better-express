export interface IGoogleConfig {
  clientID: string;
  clientSecret: string;
  redirectURI: string;
}

export interface IGoogleOAuthUrlResponse {
  googleOAuthUrl: string;
}

export interface IGoogleOAuthTokenPayload {
  access_token: string;
  id_token: string;
  expires_in: string;
  token_type: string;
  refresh_token: string;
}

export interface IGoogleOAuthUserInfoResponse {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}
