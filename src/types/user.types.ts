export enum UserRoles {
  regular = 'regular',
  admin = 'admin',
}

export interface IUserToken {
  token: string;
}

export enum UserAuthFlow {
  basic = 'basic',
  googleOAuth = 'googleOAuth',
}
