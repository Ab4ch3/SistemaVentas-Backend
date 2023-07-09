//Importamos librerias
import express from "express";

//Morgan nos muestra las peticiones por consola realizadas por la app o web
import morgan from "morgan";

// Cors nos permite aceptar peticiones remotas a nuestro servidor
import cors from "cors";

// Importamos Path
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Desestructuramos modulos
import Config from "./Config/index.js";

// Importamos Database
import Database from "./Database/index.js";

// Importamos Router
// import router from "./Routes/index.js";

// Importamos v1 Router
import v1Router from "./v1/routes/index.js";

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

//Indicamos el uso de router.
app.use(v1Router);

// Habilitar la escucha del servidor
app.listen(Config.PORT, () => {
  console.info(`Servidor escuchando en el puerto ${Config.PORT} `);
});
