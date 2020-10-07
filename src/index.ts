import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import express, { Application } from 'express';

import { loginRouter } from './routes/login.routes';

const app: Application = express();

const port = process.env.PORT || 3000

// Middlewares ========================================
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(cookieSession({
  keys: ['laskdjf']
}))
// ROUTES ========================================
app.use(loginRouter)

app.listen(port, () => {
  console.log(`App listening to port ${port}!!`);
})