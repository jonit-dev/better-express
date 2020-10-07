import bodyParser from 'body-parser';
import express, { Application } from 'express';

import { loginRouter } from './routes/login.routes';

const app: Application = express();

const port = process.env.PORT || 3000

// Middlewares ========================================
app.use(bodyParser.urlencoded({
  extended: true
}))
// ROUTES ========================================
app.use(loginRouter)

app.listen(port, () => {
  console.log(`App listening to port ${port}!!`);
})