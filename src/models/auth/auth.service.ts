import { injectable } from 'inversify';
import jwt from 'jsonwebtoken';

import { appEnv } from '../../config/env';
import { ConflictError } from '../../errors/ConflictError';
import { NotFoundError } from '../../errors/NotFoundError';
import { IUser, User } from '../user/user.model';
import { AuthLoginDTO, AuthSignUpDTO } from './auth.dto';

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

  public async login(authLoginDTO: AuthLoginDTO): Promise<string> {
    const { email, password } = authLoginDTO;

    // try to find an user using these credentials
    const user = await User.findByCredentials(email, password);

    if (!user) {
      throw new NotFoundError('Invalid credentials. Please, try again!');
    }

    // else, if we got an user with these credentials,

    const accessToken = jwt.sign(
      { _id: user._id, email: user.email },
      appEnv.authentication.JWT_SECRET
    );

    return accessToken;
  }
}
