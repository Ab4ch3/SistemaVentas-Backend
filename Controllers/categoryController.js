// Importar Servicios
import debug from "debug";
import categoriesServices from "../Services/categoriesServices.js";
const logger = debug("app:module-CategoryController");
// const debug = require("debug")("app:module-CategoryController");

export default {
  getCategories: async (req, res, next) => {
    try {
      const { body } = req;
      const categories = await categoriesServices.getAll(body);
      res.status(200).json(categories);
    } catch (e) {
      logger(e);
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
      logger(e);
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
      logger(e);
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
      logger(e);
      res.status(500).send({
        message: "Internal Server Error",
      });
      next(e);
    }
  },
  removeCategory: async (req, res, next) => {
    try {
      const {
        params: { id },
      } = req;
      let categoryDeleted = await categoriesServices.delete(id);
      if (!categoryDeleted) {
        res.status(404).send({
          message: "Not Found",
        });
      } else {
        res.status(200).json({
          message: "Category Deleted",
          body: categoryDeleted,
        });
      }
    } catch (e) {
      logger(e);
      res.status(500).send({
        message: "Internal Server Error",
      });
      next(e);
    }
  },
  enableCategory: async (req, res, next) => {
    try {
      const {
        params: { id },
      } = req;
      const { body } = req;
      let enableCategory = await categoriesServices.enable(id, body);
      if (!enableCategory) {
        res.status(404).send({
          message: "Not Found",
        });
      } else {
        res.status(200).json({
          message: "Category Enabled",
          body: enableCategory,
        });
      }
    } catch (e) {
      logger(e);
      res.status(500).send({
        message: "Internal Server Error",
      });
      next(e);
    }
  },
  disableCategory: async (req, res, next) => {
    try {
      const {
        params: { id },
      } = req;
      const { body } = req;
      let disableCategory = await categoriesServices.disable(id, body);
      if (!disableCategory) {
        res.status(404).send({
          message: "Not Found",
        });
      } else {
        res.status(200).json({
          message: "Category Disabled",
          body: disableCategory,
        });
      }
    } catch (e) {
      logger(e);
      res.status(500).send({
        message: "Internal Server Error",
      });
      next(e);
    }
  },
};
