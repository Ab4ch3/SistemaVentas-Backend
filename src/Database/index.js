// Controla Todo lo relacionado con la conexion a base de datos
// Importamos mongoose
import mongoose from "mongoose";
import debug from "debug";
const logger = debug("app:module-database");
import Config from "../Config/index.js";

var connection = null;
const Database = new Promise(async (res, rej) => {
  try {
    if (!connection) {
      connection = await mongoose.connect(
        `mongodb+srv://${Config.DB_USER}:${Config.DB_PASS}@${Config.DB_CLUSTER}/${Config.DB_NAME}?retryWrites=true&w=majority`,
        { useNewUrlParser: true }
      );
      logger("Connected To MongoDB Atlas");
    }
    logger("Reusing Connection To MongoDB Atlas");
    res(connection);
  } catch (err) {
    rej(err);
    logger("Connection Error");
  }
});
// Esportar default solo 1 funcion
export default Database;
