// Importar Servicios
import articleServices from "../Services/articleServices.js";
import debug from "debug";
const logger = debug("app:module-ArticleController");

export default {
  getAllArticles: async (req, res, next) => {
    try {
      const { body } = req;
      const allArticles = await articleServices.getAllArticles(body);
      res.status(200).json({ data: allArticles });
    } catch (e) {
      logger(e);
      res.status(500).send({
        message: "Internal Server Error",
      });

      next(e);
    }
  },
  getArticle: async (req, res, next) => {
    try {
      const {
        params: { id },
      } = req;
      let article = await articleServices.getArticle(id);
      if (!article) {
        res.status(404).send({
          message: "Not Found",
        });
      } else {
        res.status(200).json({ data: article });
      }
    } catch (e) {
      logger(e);
      res.status(500).send({
        message: "Internal Server Error",
      });
      next(e);
    }
  },
  getArticleByBarCode: async (req, res, next) => {
    try {
      const { body } = req;
      let article = await articleServices.getArticleByBarCode(body);
      if (!article) {
        res.status(404).send({
          message: "Not Found",
        });
      } else {
        res.status(200).json({ data: article });
      }
    } catch (e) {
      logger(e);
      res.status(500).send({
        message: "Internal Server Error",
      });
      next(e);
    }
  },
  createArticle: async (req, res, next) => {
    try {
      const { body } = req;
      if (!body || Object.keys(body).length === 0) {
        res.status(400).send({
          message: "Bad Request",
        });
      } else {
        const createdArticle = await articleServices.createArticle(body);
        res.status(201).json({
          message: "Article Created",
          data: createdArticle,
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
  updateArticle: async (req, res, next) => {
    try {
      const {
        params: { id },
      } = req;
      const { body } = req;
      let updatedArticle = await articleServices.updateArticle(id, body);
      if (!updatedArticle) {
        res.status(404).send({
          message: "Not Found",
        });
      } else {
        res.status(200).json({
          message: "Article Updated",
          data: updatedArticle,
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
  deleteArticle: async (req, res, next) => {
    try {
      const {
        params: { id },
      } = req;
      let deletedArticle = await articleServices.deleteArticle(id);
      if (!deletedArticle) {
        res.status(404).send({
          message: "Not Found",
        });
      } else {
        res.status(200).json({
          message: "Article Deleted",
          data: deletedArticle,
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
  enableArticle: async (req, res, next) => {
    try {
      const {
        params: { id },
      } = req;
      const { body } = req;
      let enabledArticle = await articleServices.enableArticle(id, body);
      if (!enabledArticle) {
        res.status(404).send({
          message: "Not Found",
        });
      } else {
        res.status(200).json({
          message: "Article Enabled",
          data: enabledArticle,
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
  disableArticle: async (req, res, next) => {
    try {
      const {
        params: { id },
      } = req;
      const { body } = req;
      let disabledArticle = await articleServices.disableArticle(id, body);
      if (!disabledArticle) {
        res.status(404).send({
          message: "Not Found",
        });
      } else {
        res.status(200).json({
          message: "Article Disabled",
          data: disabledArticle,
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
