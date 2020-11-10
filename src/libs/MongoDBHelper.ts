import mongoose from "mongoose";

import { appEnv } from "../config/env";

export class MongoDBHelper {
  public static init(): void {
    mongoose.connect(
      `${appEnv.database.MONGO_HOST_CONTAINER}://localhost:${appEnv.database.MONGO_PORT}/${appEnv.database.MONGO_INITDB_DATABASE}`,
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      () => {
        console.log(
          `Connected to mongodb database on Docker container ${appEnv.database.MONGO_HOST_CONTAINER} at port ${appEnv.database.MONGO_PORT}`
        );
      }
    );
  }
}
