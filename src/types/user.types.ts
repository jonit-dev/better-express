export enum UserRoles {
  Regular = "Regular",
  Admin = "Admin",
}

export interface IUserToken {
  token: string;
}

export enum UserAuthFlow {
  Basic = "Basic",
  GoogleOAuth = "GoogleOAuth",
}
