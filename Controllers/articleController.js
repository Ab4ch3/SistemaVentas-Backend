// Importar Servicios
import articlesServices from "../Services/articlesServices";
const debug = require("debug")("app:module-ArticleController");

export default {
  getArticles: async (req, res, next) => {
    try {
      const { body } = req;
      const articles = await articlesServices.getAll(body);
      res.status(200).json(articles);
    } catch (e) {
      debug(e);
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
      let article = await articlesServices.getById(id);
      if (!article) {
        res.status(404).send({
          message: "Not Found",
        });
      } else {
        res.status(200).json(article);
      }
    } catch (e) {
      debug(e);
      res.status(500).send({
        message: "Internal Server Error",
      });
      next(e);
    }
  },
  getArticleByBarCode: async (req, res, next) => {
    try {
      const { body } = req;
      let article = await articlesServices.getByBarCode(body);
      if (!article) {
        res.status(404).send({
          message: "Not Found",
        });
      } else {
        res.status(200).json(article);
      }
    } catch (e) {
      debug(e);
      res.status(500).send({
        message: "Internal Server Error",
      });
      next(e);
    }
  },
  addArticle: async (req, res, next) => {
    try {
      const { body } = req;
      if (!body || Object.keys(body).length === 0) {
        res.status(400).send({
          message: "Bad Request",
        });
      } else {
        const newArticle = await articlesServices.create(body);
        res.status(201).json({
          message: "Article Created",
          body: newArticle,
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
  updateArticle: async (req, res, next) => {
    try {
      const {
        params: { id },
      } = req;
      const { body } = req;
      let articleUpdate = await articlesServices.update(id, body);
      if (!articleUpdate) {
        res.status(404).send({
          message: "Not Found",
        });
      } else {
        res.status(200).json({
          message: "Article Updated",
          body: articleUpdate,
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
  removeArticle: async (req, res, next) => {
    try {
      const {
        params: { id },
      } = req;
      let articleDeleted = await articlesServices.delete(id);
      if (!articleDeleted) {
        res.status(404).send({
          message: "Not Found",
        });
      } else {
        res.status(200).json({
          message: "Article Deleted",
          body: articleDeleted,
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
  enableArticle: async (req, res, next) => {
    try {
      const {
        params: { id },
      } = req;
      const { body } = req;
      let enableArticle = await articlesServices.enable(id, body);
      if (!enableArticle) {
        res.status(404).send({
          message: "Not Found",
        });
      } else {
        res.status(200).json({
          message: "Article Enabled",
          body: enableArticle,
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
  disableArticle: async (req, res, next) => {
    try {
      const {
        params: { id },
      } = req;
      const { body } = req;
      let disableArticle = await articlesServices.disable(id, body);
      if (!disableArticle) {
        res.status(404).send({
          message: "Not Found",
        });
      } else {
        res.status(200).json({
          message: "Article Disabled",
          body: disableArticle,
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
};
