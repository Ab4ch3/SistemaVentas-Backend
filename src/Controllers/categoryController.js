// Importar Servicios
import debug from "debug";
import categoryServices from "../Services/categoryServices.js";
const logger = debug("app:module-CategoryController");

export default {
  getAllCategories: async (req, res, next) => {
    try {
      const { body } = req;
      const Allcategories = await categoryServices.getAllCategories(body);
      res.status(200).json({ data: Allcategories });
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
      let category = await categoryServices.getCategory(id);
      if (!category) {
        res.status(404).send({
          message: "Not Found",
        });
      } else {
        res.status(200).json({ data: category });
      }
    } catch (e) {
      logger(e);
      res.status(500).send({
        message: "Internal Server Error",
      });
      next(e);
    }
  },
  createNewCategory: async (req, res, next) => {
    try {
      const { body } = req;
      if (!body || Object.keys(body).length === 0) {
        res.status(400).send({
          message: "Bad Request",
        });
      } else {
        const createdCategory = await categoryServices.createNewCategory(body);
        res.status(201).json({
          message: "Category Created",
          data: createdCategory,
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
      let Updatedcategory = await categoryServices.updateCategory(id, body);
      if (!Updatedcategory) {
        res.status(404).send({
          message: "Not Found",
        });
      } else {
        res.status(200).json({
          message: "Category Updated",
          data: Updatedcategory,
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
  deleteCategory: async (req, res, next) => {
    try {
      const {
        params: { id },
      } = req;
      let Deletedcategory = await categoryServices.deleteCategory(id);
      if (!Deletedcategory) {
        res.status(404).send({
          message: "Not Found",
        });
      } else {
        res.status(200).json({
          message: "Category Deleted",
          data: Deletedcategory,
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
      let enabledCategory = await categoryServices.enableCategory(id, body);
      if (!enabledCategory) {
        res.status(404).send({
          message: "Not Found",
        });
      } else {
        res.status(200).json({
          message: "Category Enabled",
          data: enabledCategory,
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
      let disabledCategory = await categoryServices.disableCategory(id, body);
      if (!disabledCategory) {
        res.status(404).send({
          message: "Not Found",
        });
      } else {
        res.status(200).json({
          message: "Category Disabled",
          data: disabledCategory,
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
