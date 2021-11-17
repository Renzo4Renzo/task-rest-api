import mongoose from "mongoose";
import config from "./config/config";

(async () => {
  try {
    const database = await mongoose.connect(config.mongodbURL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Succesful connection with database " + database.connection.name + "!");
  } catch (error) {
    console.error("Connection error: " + error.toString());
  }
})();
