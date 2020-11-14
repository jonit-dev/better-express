import { injectable } from 'inversify';

import { IUser, User } from '../user/user.model';

@injectable()
export class AuthRepository {
  public async signUp(newUserData): Promise<IUser> {
    //! Note: password is hashed on pre("save") method from userSchema
    const newUser = new User({
      ...newUserData,
    });

    await newUser.save();

    return newUser;
  }
}
