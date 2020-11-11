import { Container } from "inversify";

import { UserRepository } from "../models/user/user.repository";
import { UserController } from "./../models/user/user.controller";
import { UserService } from "./../models/user/user.service";

const container = new Container();

container.bind<UserRepository>("UserRepository").to(UserRepository);
container.bind<UserService>("UserService").to(UserService);
container.bind<UserController>("UserController").to(UserController);

export { container };
