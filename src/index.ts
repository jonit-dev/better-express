import "reflect-metadata";

import bodyParser from "body-parser";
import { InversifyExpressServer } from "inversify-express-utils";
import morgan from "morgan";

import { container } from "./config/inversify";
import { MongoDBHelper } from "./libs/MongoDBHelper";
import { AuthMiddleware } from "./middlewares/auth.middleware";
import { errorHandler } from "./middlewares/errorHandler.midleware";

const server = new InversifyExpressServer(container);

server.setConfig((app) => {
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(bodyParser.json());
  app.use(morgan("combined"));

  AuthMiddleware.initStrategies(); // initialize passportjs auth strategies
});

const app = server.build();

const port = process.env.SERVER_PORT || 3002;

app.listen(port, async () => {
  await MongoDBHelper.init(); // Initialize mongodb
  console.log(`Server listening on port ${port}`);
});

app.use(errorHandler); // global error handling middleware must be the last one in order
