import { inject, injectable } from "inversify";

import { BadRequestError } from "../../errors/BadRequestError";
import { UserRepository } from "./user.repository";

@injectable()
export class UserService {

  constructor(
    @inject("UserRepository") private userRepository: UserRepository
  ) { }

  public async unsubscribeUser(email: string): Promise<void> {

    const user = await this.userRepository.findUser({ email });

    if (user.unsubscribed === true) {
      throw new BadRequestError("This user is already unsubscribed!");
    }

    user.unsubscribed = true;
    await user.save();


  }


}
