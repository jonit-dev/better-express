import jwt from "jsonwebtoken";

import { appEnv } from "../config/env";
import { ForbiddenError } from "../errors/ForbiddenError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { User } from "../models/user/user.model";
import { IRequestCustom } from "../types/express.types";

export const AuthMiddleware = (req: IRequestCustom, res, next): void => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(
      token,
      appEnv.authentication.JWT_SECRET!,
      async (err, jwtPayload: any) => {
        if (err) {
          // here we associate the error to a variable because just throwing then inside this async block won't allow them to achieve the outside scope and be caught by errorHandler.middleware. That's why we're passing then to next...
          const error = new ForbiddenError(
            "Please, login to access this resource."
          );
          next(error);
        }

        const dbUser = await User.findOne({ email: jwtPayload.email });

        if (!dbUser) {
          const error = new ForbiddenError(
            "Please, login to access this resource."
          );
          next(error);
        } else {
          req.user = dbUser;
        }

        next();
      }
    );
  } else {
    throw new UnauthorizedError(
      "Sorry, you're not allowed to access this resource."
    );
  }
};
