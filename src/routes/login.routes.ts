import { Request, Response, Router } from 'express';

import { TemplateHelper } from '../libs/TemplateHelper';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { HttpStatusCode, RequestWithBody } from '../types/express.types';

const router = Router();

router.get('/', (req: Request, res: Response) => {

  const { session } = req;


  if (session && session.loggedIn) {

    const template = TemplateHelper.loadTemplate('loggedIn')
    return res.status(HttpStatusCode.OK).send(template)

  } else {
    return res.redirect('/login')
  }


})

router.get('/login', (req: Request, res: Response) => {

  const template = TemplateHelper.loadTemplate('login')

  return res.send(template)
})

router.get('/logout', (req: Request, res: Response) => {

  if (req.session) {
    req.session = null;
  }

  return res.redirect('/')


})

router.get('/protected', AuthMiddleware.requireAuth, (req: Request, res: Response) => {
  const template = TemplateHelper.loadTemplate('protected')
  return res.send(template)

})

router.post('/login', (req: RequestWithBody, res: Response) => {

  const { email, password } = req.body


  if (email && password) {

    // I've just used hardcoded credentials because the purpose of this app is ONLY showing how does TS works together with express.
    if (email === 'hardcoded@email.com' && password === "123") {

      req.session = { loggedIn: true }

      res.redirect('/')
    } else {
      return res.status(HttpStatusCode.Unauthorized).send({
        message: "Wrong e-mail or password"
      })
    }

  } else {
    return res.status(HttpStatusCode.Unauthorized).send({
      message: 'Email or password not provided'
    })
  }


})


export { router as loginRouter }