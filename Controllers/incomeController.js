// Importar Servicios
import incomeServices from "../Services/incomeServices.js";
// const debug = require("debug")("app:module-IncomeController");
import debug from "debug";
const logger = debug("app:module-IncomeController");
export default {
  getAllIncome: async (req, res, next) => {
    try {
      const { body } = req;
      let income = await incomeServices.getAll(body);
      res.status(200).json(income);
    } catch (e) {
      logger(e);
      res.status(500).send({
        message: "Internal Server Error",
      });

      next(e);
    }
  },
  getIncome: async (req, res, next) => {
    try {
      const {
        params: { id },
      } = req;
      let income = await incomeServices.getById(id);
      if (!income) {
        res.status(404).send({
          message: "Not Found",
        });
      } else {
        res.status(200).json(income);
      }
    } catch (e) {
      logger(e);
      res.status(500).send({
        message: "Internal Server Error",
      });
      next(e);
    }
  },

  addIncome: async (req, res, next) => {
    try {
      const { body } = req;
      if (!body || Object.keys(body).length === 0) {
        res.status(400).send({
          message: "Bad Request",
        });
      } else {
        const newIncome = await incomeServices.create(body);
        res.status(201).json({
          message: "Income Created",
          body: newIncome,
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

  enableIncome: async (req, res, next) => {
    try {
      const {
        params: { id },
      } = req;
      const { body } = req;
      let enableIncome = await incomeServices.enable(id, body);
      if (!enableIncome) {
        res.status(404).send({
          message: "Not Found",
        });
      } else {
        res.status(200).json({
          message: "Income Enabled",
          body: enableIncome,
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
  disableIncome: async (req, res, next) => {
    try {
      const {
        params: { id },
      } = req;
      const { body } = req;
      let disableIncome = await incomeServices.disable(id, body);
      if (!disableIncome) {
        res.status(404).send({
          message: "Not Found",
        });
      } else {
        res.status(200).json({
          message: "Income Disabled",
          body: disableIncome,
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
  GetGraph12Months: async (req, res, next) => {
    try {
      let graph = await incomeServices.graphs12Months();
      res.status(200).json(graph);
    } catch (e) {
      logger(e);
      res.status(500).send({
        message: "Internal Server Error",
      });
      next(e);
    }
  },
  getCheckDates: async (req, res, next) => {
    try {
      const { body } = req;
      let result = await incomeServices.checkDates(body);
      res.status(200).json(result);
    } catch (e) {
      logger(e);
      res.status(500).send({
        message: "Internal Server Error",
      });

      next(e);
    }
  },
};
