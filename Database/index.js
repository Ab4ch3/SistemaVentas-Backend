// Controla Todo lo relacionado con la conexion a base de datos
// Importamos mongoose
import mongoose from "mongoose";
const debug = require("debug")("app:module-database");
const { Config } = require("../Config/index.js");

var connection = null;
module.exports.Database = () => {
  new Promise(async (res, rej) => {
    try {
      if (!connection) {
        connection = await mongoose.connect(
          `mongodb+srv://${Config.DB_USER}:${Config.DB_PASS}@${Config.DATABASE_NAME}/?retryWrites=true&w=majority`,
          { useNewUrlParser: true }
        );
        debug("Nueva conexion realizada con MongoDB Atlas");
      }
      debug("Reutilizando Conexion con MongoDB Atlas");
      res(connection);
    } catch (err) {
      debug("Error en conexion");
      rej(err);
    }
  });
};
