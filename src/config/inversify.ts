import { Container } from "inversify";
import { UserService } from "./../models/user/user.service";
import { UserController } from "./../models/user/user.controller";

const container = new Container();

container.bind<UserService>("UserService").to(UserService);
container.bind<UserController>("UserController").to(UserController);

export { container };
