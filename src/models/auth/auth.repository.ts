import { injectable } from 'inversify';

import { IUser, User } from '../user/user.model';
import { AuthSignUpDTO } from './auth.dto';

@injectable()
export class AuthRepository {
  public async signUp(authSignUpDTO: AuthSignUpDTO): Promise<IUser> {
    const { email, password, name } = authSignUpDTO;

    // if it doesn't exists, lets create it

    const newUser = new User({
      name,
      email,
      password, // password is hashed on pre("save") method from userSchema
    });

    await newUser.save();

    return newUser;
  }
}
