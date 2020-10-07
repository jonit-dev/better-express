import express, { Application, Request, Response } from 'express';

const app: Application = express();

const port = process.env.PORT || 3000

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world!')
})

app.listen(port, () => {
  console.log(`App listening to port ${port}!!`);
})