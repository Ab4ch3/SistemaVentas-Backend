// Importar Servicios
import incomeServices from "../Services/incomeServices.js";
import debug from "debug";
const logger = debug("app:module-IncomeController");
export default {
  getAllIncome: async (req, res, next) => {
    try {
      const { body } = req;
      let Allincome = await incomeServices.getAllIncome(body);
      res.status(200).json({ data: Allincome });
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
      let income = await incomeServices.getIncome(id);
      if (!income) {
        res.status(404).send({
          message: "Not Found",
        });
      } else {
        res.status(200).json({ data: income });
      }
    } catch (e) {
      logger(e);
      res.status(500).send({
        message: "Internal Server Error",
      });
      next(e);
    }
  },

  createNewIncome: async (req, res, next) => {
    try {
      const { body } = req;
      if (!body || Object.keys(body).length === 0) {
        res.status(400).send({
          message: "Bad Request",
        });
      } else {
        const createdIncome = await incomeServices.createNewIncome(body);
        res.status(201).json({
          message: "Income Created",
          data: createdIncome,
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
      let enabledIncome = await incomeServices.enableIncome(id, body);
      if (!enabledIncome) {
        res.status(404).send({
          message: "Not Found",
        });
      } else {
        res.status(200).json({
          message: "Income Enabled",
          data: enabledIncome,
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
      let disabledIncome = await incomeServices.disableIncome(id, body);
      if (!disabledIncome) {
        res.status(404).send({
          message: "Not Found",
        });
      } else {
        res.status(200).json({
          message: "Income Disabled",
          data: disabledIncome,
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
  getGraph12Months: async (req, res, next) => {
    try {
      let Allgraph = await incomeServices.getGraph12Months();
      res.status(200).json({ data: Allgraph });
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
      res.status(200).json({ data: result });
    } catch (e) {
      logger(e);
      res.status(500).send({
        message: "Internal Server Error",
      });

      next(e);
    }
  },
};
