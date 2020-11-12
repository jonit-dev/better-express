import { injectable } from 'inversify';

import { IUser, User } from '../user/user.model';
import { AuthSignUpDTO } from './auth.dto';

@injectable()
export class AuthRepository {
  public async signUp(authSignUpDTO: AuthSignUpDTO): Promise<IUser> {
    const { email, password, name } = authSignUpDTO;

    // if it doesnt exists, lets create it

    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save();

    return newUser;
  }
}
