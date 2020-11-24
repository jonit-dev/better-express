import { UnauthorizedError } from "../errors/UnauthorizedError";
import { IUser } from "../models/user/user.model";
import { IRequestCustom } from "../types/express.types";
import { UserRoles } from "../types/user.types";

export const isAdminMiddleware = (req: IRequestCustom, res, next): void => {

  const user = req.user as IUser;

  if (user.role !== UserRoles.admin) {
    throw new UnauthorizedError("Only admins can access this resource!");
  } else {
    next();
  }


};
