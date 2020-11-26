import "reflect-metadata";

import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import morgan from "morgan";

import { appEnv } from "./config/env";
import { container } from "./config/inversify";
import { MongoDBHelper } from "./libs/mongo.helper";
import { ServerHelper } from "./libs/server.helper";
import { errorHandlerMiddleware } from "./middlewares/errorHandler.midleware";

const server = new InversifyExpressServer(container);

server.setConfig((app) => {
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use("*", cors());
  app.use(bodyParser.json());
  app.use(morgan("dev"));
  app.use(express.static("public"));
});

const app = server.build();

const port = process.env.SERVER_PORT || 3002;

app.listen(port, async () => {
  await MongoDBHelper.init(); // Initialize mongodb

  ServerHelper.showBootstrapMessage({
    appName: appEnv.general.APP_NAME!,
    port: appEnv.general.SERVER_PORT!,
    timezone: appEnv.general.TIMEZONE!,
    adminEmail: appEnv.general.ADMIN_EMAIL!,
    language: appEnv.general.LANGUAGE!,
    phoneLocale: appEnv.general.PHONE_LOCALE!,
  });


});

app.use(errorHandlerMiddleware); // global error handling middleware must be the last one in order
