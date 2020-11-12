import jwt from 'jsonwebtoken';

import { appEnv } from '../config/env';
import { ForbiddenError } from '../errors/ForbiddenError';
import { UnauthorizedError } from '../errors/UnauthorizedError';

export const AuthRoute = (req, res, next): void => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, appEnv.authentication.JWT_SECRET, (err, user) => {
      if (err) {
        throw new ForbiddenError('Please, login to access this resource.');
      }

      req.user = user;
      next();
    });
  } else {
    throw new UnauthorizedError(
      "Sorry, you're not allowed to access this resource."
    );
  }
};
