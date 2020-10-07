import { Request, Response, Router } from 'express';

import { TemplateHelper } from '../libs/TemplateHelper';
import { HttpStatusCode, RequestWithBody } from '../types/express.types';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  return res.send('hi there')
})

router.get('/login', (req: Request, res: Response) => {

  const template = TemplateHelper.loadTemplate('login')

  return res.send(template)
})

router.post('/login', (req: RequestWithBody, res: Response) => {

  const { email, password } = req.body



  if (email && password) {


    // I've just used hardcoded credentials because the purpose of this app is ONLY showing how does TS works together with express.
    if (email === 'hardcoded@email.com' && password === "123") {

      req.session = { loggedIn: true }

      res.redirect('/')
    }


    return res.status(HttpStatusCode.OK).send({
      message: 'Access granted!'
    })
  } else {
    return res.status(HttpStatusCode.UnprocessableEntity).send({
      message: 'Email or password not provided'
    })
  }




})


export { router as loginRouter }