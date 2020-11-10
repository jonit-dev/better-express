import "reflect-metadata";

import bodyParser from "body-parser";
import { InversifyExpressServer } from "inversify-express-utils";

import { container } from "./config/inversify";
import { MongoDBHelper } from "./libs/MongoDBHelper";

const server = new InversifyExpressServer(container);

server.setConfig((app) => {
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(bodyParser.json());
});

const app = server.build();

const port = process.env.PORT || 3000;

MongoDBHelper.init(); // Initialize mongodb

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
