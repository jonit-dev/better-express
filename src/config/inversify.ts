import { Container } from 'inversify';

import { ConsoleHelper } from '../libs/console.helper';
import { AuthController } from '../models/auth/auth.controller';
import { AuthService } from '../models/auth/auth.service';
import { UserRepository } from '../models/user/user.repository';
import { UserController } from './../models/user/user.controller';
import { UserService } from './../models/user/user.service';

const container = new Container();

container.bind<ConsoleHelper>('ConsoleHelper').to(ConsoleHelper);
container.bind<AuthController>('AuthController').to(AuthController);
container.bind<AuthService>('AuthService').to(AuthService);
container.bind<UserRepository>('UserRepository').to(UserRepository);
container.bind<UserService>('UserService').to(UserService);
container.bind<UserController>('UserController').to(UserController);

export { container };
