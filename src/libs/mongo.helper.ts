import mongoose from "mongoose";

import { appEnv } from "../config/env";

export class MongoDBHelper {
  public static async init(): Promise<void> {
    try {
      await mongoose.connect(
        `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_HOST_CONTAINER}:${process.env.MONGO_PORT}/${process.env.MONGO_INITDB_DATABASE}?authSource=admin`,
        {
          useNewUrlParser: true,
          useCreateIndex: true,
          useUnifiedTopology: true,
          dbName: process.env.MONGO_INITDB_DATABASE,
        },
        (err) => {
          if (err) {
            console.log("Error while connecting to MongoDB!");
            console.log(err);
            return;
          }

          console.log(
            `Connected to mongodb database on Docker container ${appEnv.database.MONGO_HOST_CONTAINER} at port ${appEnv.database.MONGO_PORT}`
          );
        }
      );
    } catch (error) {
      console.error(error);
    }
  }
}
