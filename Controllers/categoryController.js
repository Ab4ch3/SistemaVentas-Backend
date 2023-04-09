// Importar Servicios
import categoriesServices from "../Services/categoriesServices";
const debug = require("debug")("app:module-CategoryController");

export default {
  getCategories: async (req, res, next) => {
    try {
      const categories = await categoriesServices.getAll();
      res.status(200).json(categories);
    } catch (e) {
      debug(e);
      res.status(500).send({
        message: "Ocurrio un error",
      });
      next(e);
    }
  },
};
