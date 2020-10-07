import { NextFunction, Request, Response } from 'express';

import { HttpStatusCode } from '../types/express.types';




export class AuthMiddleware {


  public static requireAuth(req: Request, res: Response, next: NextFunction): void {

    if (req.session && req.session.loggedIn) {
      next();
      return
    }


    res.status(HttpStatusCode.Forbidden).send({
      message: 'Unauthorized! Please, login.'
    })

  }



}