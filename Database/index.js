// Controla Todo lo relacionado con la conexion a base de datos
// Importamos mongoose
import mongoose from "mongoose";
const debug = require("debug")("app:module-database");
const { Config } = require("./Config/index");

mainDatabase().then((mongoose) =>
  debug(
    `Conectado a la DB ${Config.DATABASE_NAME} por el puerto ${Config.DB_PORT}`
  )
);
mainDatabase().catch((err) => debug(err));

async function mainDatabase() {
  await mongoose.connect(
    `mongodb+srv://${Config.DB_URL}:${Config.DB_PORT}/${Config.DATABASE_NAME}`,
    { useCreateIndex: true, useNewUrlParser: true }
  );

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
