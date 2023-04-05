require("dotenv").config();

module.exports.Config = {
  PORT: process.env.PORT || 3000, //Si no se le configura un puerto en el .evn , colocara un puerto por defecto
  DB_URL: "",
  DB_PORT: "",
  DATABASE_NAME: "",
};
