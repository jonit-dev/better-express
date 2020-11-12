import { Request } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import LocalStrategy from 'passport-local';

import { ConflictError } from '../errors/ConflictError';
import { NotFoundError } from '../errors/NotFoundError';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { User } from '../models/user/user.model';

export class AuthMiddleware {
  public static initStrategies(): void {
    passport.use(
      'signup',
      new LocalStrategy(
        {
          usernameField: 'email',
          passwordField: 'password',
          passReqToCallback: true,
        },
        async (req: Request, email: string, password: string, done) => {
          try {
            const { name } = req.body; // here we get some additional fields from req.body. Note that email and password are automatically fetched from request by passportjs

            if (await User.checkIfExists(email)) {
              throw new ConflictError('User already exists!');
            }

            const user = await User.create({ email, password, name });

            return done(null, user);
          } catch (error) {
            done(error);
          }
        }
      )
    );

    passport.use(
      'login',
      new LocalStrategy(
        {
          usernameField: 'email',
          passwordField: 'password',
        },
        async (email, password, done) => {
          try {
            const user = await User.findOne({ email });

            if (!user) {
              throw new NotFoundError('User not found');
            }

            const validate = await user.isValidPassword(password);

            if (!validate) {
              throw new UnauthorizedError('Invalid credentials!');
            }

            return done(null, user, { message: 'Logged in Successfully' });
          } catch (error) {
            return done(error);
          }
        }
      )
    );
  }

  public static login = (req, res, next): any => {
    passport.authenticate('login', async (err, user, info) => {
      try {
        if (err || !user) {
          throw err;
        }

        req.login(user, { session: false }, async (error) => {
          if (error) return next(error);

          // compose JWT payload, and sign token
          const body = { _id: user._id, email: user.email };
          const token = jwt.sign({ user: body }, process.env.JWT_SECRET);

          return res.json({ accessToken: token });
        });
      } catch (error) {
        return next(error);
      }
    })(req, res, next);
  };
}
