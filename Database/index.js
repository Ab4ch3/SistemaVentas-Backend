// Controla Todo lo relacionado con la conexion a base de datos
// Importamos mongoose
import mongoose from "mongoose";
const debug = require("debug")("app:module-database");
const { Config } = require("../Config/index.js");
var connection = null;

const Database = new Promise(async (res, rej) => {
  try {
    if (!connection) {
      connection = await mongoose.connect(
        `mongodb+srv://${Config.DB_USER}:${Config.DB_PASS}@${Config.DB_CLUSTER}/${Config.DB_NAME}?retryWrites=true&w=majority`,
        { useNewUrlParser: true }
      );
      debug("Connected To MongoDB Atlas");
    }
    debug("Reusing Connection To MongoDB Atlas");
    res(connection);
  } catch (err) {
    rej(err);
    debug("Connection Error");
  }
});
export default Database;
