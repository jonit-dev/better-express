import passport from "passport";
import LocalStrategy from "passport-local";

import { User } from "../models/user/user.model";

export class AuthMiddleware {
  public static initStrategies(): void {
    passport.use(
      "signup",
      new LocalStrategy(
        {
          usernameField: "email",
          passwordField: "password",
        },
        async (email: string, password: string, done) => {
          try {
            const user = await User.create({ email, password });

            return done(null, user);
          } catch (error) {
            done(error);
          }
        }
      )
    );

    passport.use(
      "login",
      new LocalStrategy(
        {
          usernameField: "email",
          passwordField: "password",
        },
        async (email, password, done) => {
          try {
            const user = await User.findOne({ email });

            if (!user) {
              return done(null, false, { message: "User not found" });
            }

            const validate = await user.isValidPassword(password);

            if (!validate) {
              return done(null, false, { message: "Wrong Password" });
            }

            return done(null, user, { message: "Logged in Successfully" });
          } catch (error) {
            return done(error);
          }
        }
      )
    );
  }
}
