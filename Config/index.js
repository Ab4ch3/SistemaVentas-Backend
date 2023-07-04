// require("dotenv").config();
import dotenv from "dotenv";
dotenv.config();

const Config = {
  PORT: process.env.PORT || 3000, //Si no se le configura un puerto en el .evn , colocara un puerto por defecto
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_CLUSTER: process.env.DB_CLUSTER,
  DB_NAME: process.env.DB_NAME,
};
export default Config;
