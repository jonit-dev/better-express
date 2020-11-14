export interface IGoogleConfig {
  clientID: string;
  clientSecret: string;
  redirectURI: string;
}

export interface IGoogleOAuthUrlResponse {
  googleOAuthUrl: string;
}

export interface IGoogleOAuthUser {
  email: string;
}

export interface IGoogleOAuthTokenPayload {
  access_token: string;
  id_token: string;
  expires_in: string;
  token_type: string;
  refresh_token: string;
}
