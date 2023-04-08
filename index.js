//Importamos librerias
import express from "express";
// const express = require("express"); ES5

//Morgan nos muestra las peticiones por consola realizadas por la app o web
import morgan from "morgan";
// const morgan = require("morgan") ES5

// Cors nos permite aceptar peticiones remotas a nuestro servidor
import cors from "cors";
// const cors = require("cors"); ES5

// Importamos Path
import path from "path";
//Desestructuramos modulos
const { Config } = require("./Config/index");
import router from "./Routes";
/* 
Base de datos Test
 */
import mongoose from "mongoose";
var connection = null;
new Promise(async (res, rej) => {
  try {
    if (!connection) {
      connection = await mongoose.connect(
        `mongodb+srv://${Config.DB_USER}:${Config.DB_PASS}@${Config.DB_CLUSTER}/${Config.DB_NAME}?retryWrites=true&w=majority&appname=taladradora`,
        { useNewUrlParser: true }
      );
      debug("Nueva conexion realizada con MongoDB Atlas");
    }
    debug("Reutilizando Conexion con MongoDB Atlas");
    res(connection);
  } catch (err) {
    rej(err);
    debug("Error en conexion");
  }
});
/*
Base de datos test
   */

// Habilitamos la opcion de debug de nodemon
const debug = require("debug")("app:main");

//Inicializamos el Server Express
const app = express();

//Indicamos que usaremos morgan , y que estamos en desarrollo
app.use(morgan("dev"));
// Indicamos que usaremos cors
app.use(cors());

//Indicamos que usaremos el middleware de express para habilitar el recibir data al servidor
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Indicas a express , cual es la ruta de los archivos publicos
app.use(express.static(path.join(__dirname, "Public")));

app.use("/api", router);
// Habilitar la escucha del servidor
app.listen(Config.PORT, () => {
  debug(`Servidor escuchando en el puerto ${Config.PORT} `);
});
