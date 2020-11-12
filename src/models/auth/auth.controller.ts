import { inject } from "inversify";
import { controller, httpPost, interfaces } from "inversify-express-utils";
import passport from "passport";

import { AuthService } from "./auth.service";

@controller("/auth")
export class AuthController implements interfaces.Controller {
  constructor(@inject("AuthService") private authService: AuthService) {}

  @httpPost("/signup", passport.authenticate("signup", { session: false }))
  public async signUp(req, res, next): Promise<any> {
    return res.json({
      message: "Signup successful",
      user: req.user,
    });
  }
}
