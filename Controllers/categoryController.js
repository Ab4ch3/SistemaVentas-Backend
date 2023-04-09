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
        message: "Internal Server Error",
      });
      next(e);
    }
  },
  getCategory: async (req, res, next) => {
    try {
      const {
        params: { id },
      } = req;
      let category = await categoriesServices.getById(id);
      if (!category) {
        res.status(404).send({
          message: "Not Found",
        });
      } else {
        res.status(200).json(category);
      }
    } catch (e) {
      debug(e);
      res.status(500).send({
        message: "Internal Server Error",
      });
      next(e);
    }
  },
  addCategory: async (req, res, next) => {
    try {
      const { body } = req;
      if (!body || Object.keys(body).length === 0) {
        res.status(400).send({
          message: "Bad Request",
        });
      } else {
        const newCategory = await categoriesServices.create(body);
        res.status(201).json({
          message: "Category Created",
          body: newCategory,
        });
      }
    } catch (e) {
      debug(e);
      res.status(500).send({
        message: "Internal Server Error",
      });
      next(e);
    }
  },
  updateCategory: async (req, res, next) => {
    try {
      const {
        params: { id },
      } = req;
      const { body } = req;
      let categoryUpdate = await categoriesServices.update(id, body);
      if (!categoryUpdate) {
        res.status(404).send({
          message: "Not Found",
        });
      } else {
        res.status(200).json({
          message: "Category Updated",
          body: categoryUpdate,
        });
      }
    } catch (e) {
      debug(e);
      res.status(500).send({
        message: "Internal Server Error",
      });
      next(e);
    }
  },
  removeCategory: async (req, res, next) => {},
  enableCategory: async (req, res, next) => {},
  disableCategory: async (req, res, next) => {},
};
