import { injectable } from 'inversify';
import jwt from 'jsonwebtoken';

import { appEnv } from '../../config/env';
import { ConflictError } from '../../errors/ConflictError';
import { NotFoundError } from '../../errors/NotFoundError';
import { IUser, User } from '../user/user.model';
import { AuthLoginDTO, AuthSignUpDTO } from './auth.dto';
import { IAuthResponse } from './auth.types';

@injectable()
export class AuthService {
  public async signUp(authSignUpDTO: AuthSignUpDTO): Promise<IUser> {
    const { email, password, name } = authSignUpDTO;

    // first, check if an user with the same e-mail already exists
    if (await User.checkIfExists(email)) {
      throw new ConflictError(
        `An user with this e-mail (${email}) already exists! Please, try again with a different one.`
      );
    }

    // if it doesnt exists, lets create it

    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save();

    return newUser;
  }

  public async login(authLoginDTO: AuthLoginDTO): Promise<IAuthResponse> {
    const { email, password } = authLoginDTO;

    // try to find an user using these credentials
    const user = await User.findByCredentials(email, password);

    if (!user) {
      throw new NotFoundError('Invalid credentials. Please, try again!');
    }

    // else, if we got an user with these credentials, lets generate an accessToken

    const accessToken = jwt.sign(
      { _id: user._id, email: user.email },
      appEnv.authentication.JWT_SECRET,
      { expiresIn: '20m' }
    );
    const refreshToken = jwt.sign(
      { _id: user._id, email: user.email },
      appEnv.authentication.REFRESH_TOKEN_SECRET
    );

    user.refreshTokens = [...user.refreshTokens, { token: refreshToken }];

    await user.save();

    return {
      accessToken,
      refreshToken,
    };
  }

  public async logout(user: IUser, refreshToken: string): Promise<void> {
    //! Remember that JWT tokens are stateless, so there's nothing on server side to remove besides our refresh tokens. Make sure that you wipe out all JWT data from the client. Read more at: https://stackoverflow.com/questions/37959945/how-to-destroy-jwt-tokens-on-logout#:~:text=You%20cannot%20manually%20expire%20a,DB%20query%20on%20every%20request.

    // remove refresh token from Db

    user.refreshTokens = user.refreshTokens?.filter(
      (item) => item.token !== refreshToken
    );

    await user.save();
  }
}
