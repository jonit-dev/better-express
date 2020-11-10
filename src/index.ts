import 'reflect-metadata'
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import express, { Application } from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';
import { container } from './config/inversify';

import { loginRouter } from './routes/login.routes';

const server = new InversifyExpressServer(container)

server.setConfig((app) => {
  app.use(bodyParser.urlencoded({
    extended: true
  }))
  app.use(bodyParser.json())
})

let app = server.build();

const port = process.env.PORT || 3000

 app.listen(port, () => {
   console.log(`Server listening on port ${port}`)
 })
