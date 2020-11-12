import jwt from 'jsonwebtoken';

import { appEnv } from '../config/env';
import { ForbiddenError } from '../errors/ForbiddenError';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { User } from '../models/user/user.model';
import { IRequestCustom } from '../types/express.types';

export const AuthRoute = (req: IRequestCustom, res, next): void => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    return jwt.verify(
      token,
      appEnv.authentication.JWT_SECRET,
      async (err, user) => {
        if (err) {
          throw new ForbiddenError('Please, login to access this resource.');
        }

        const dbUser = await User.findOne({ email: user.email });

        if (dbUser) req.user = dbUser;
        next();
      }
    );
  } else {
    throw new UnauthorizedError(
      "Sorry, you're not allowed to access this resource."
    );
  }
};
