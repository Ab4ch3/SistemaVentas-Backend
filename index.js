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
// Importamos Database
import Database from "./Database";

import router from "./Routes";

// Habilitamos la opcion de debug de nodemon
const debug = require("debug")("app:main");

//Inicializamos el Server Express
const app = express();
// Inicializamos Conexion a la base de datos
Database;

//Indicamos que usaremos morgan , y que estamos en desarrollo
app.use(morgan("dev"));
// Indicamos que usaremos cors
app.use(cors());

//Indicamos que usaremos el middleware de express para habilitar el recibir data al servidor
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Indicas a express , cual es la ruta de los archivos publicos
app.use(express.static(path.join(__dirname, "Public")));

app.use(router);
// Habilitar la escucha del servidor
app.listen(Config.PORT, () => {
  debug(`Servidor escuchando en el puerto ${Config.PORT} `);
});
