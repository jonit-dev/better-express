import { Container } from "inversify";

import { ConsoleHelper } from "../libs/console.helper";
import { EncryptionHelper } from "../libs/encryption.helper";
import { GoogleOAuthHelper } from "../libs/googleOauth.helper";
import { AuthController } from "../models/auth/auth.controller";
import { AuthRepository } from "../models/auth/auth.repository";
import { AuthService } from "../models/auth/auth.service";
import { UserRepository } from "../models/user/user.repository";
import { UserController } from "./../models/user/user.controller";
import { UserService } from "./../models/user/user.service";

const container = new Container();

container.bind<EncryptionHelper>("EncryptionHelper").to(EncryptionHelper);
container.bind<ConsoleHelper>("ConsoleHelper").to(ConsoleHelper);
container.bind<GoogleOAuthHelper>("GoogleOAuthHelper").to(GoogleOAuthHelper);
container.bind<AuthController>("AuthController").to(AuthController);
container.bind<AuthService>("AuthService").to(AuthService);
container.bind<AuthRepository>("AuthRepository").to(AuthRepository);
container.bind<UserRepository>("UserRepository").to(UserRepository);
container.bind<UserService>("UserService").to(UserService);
container.bind<UserController>("UserController").to(UserController);

export { container };
