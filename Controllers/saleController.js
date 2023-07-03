// Importar Servicios
import SaleServices from "../Services/saleServices";
const debug = require("debug")("app:module-SaleController");

export default {
  getAllSale: async (req, res, next) => {
    try {
      const { body } = req;
      let sale = await SaleServices.getAll(body);
      res.status(200).json(sale);
    } catch (e) {
      debug(e);
      res.status(500).send({
        message: "Internal Server Error",
      });

      next(e);
    }
  },
  getSale: async (req, res, next) => {
    try {
      const {
        params: { id },
      } = req;
      let sale = await SaleServices.getById(id);
      if (!sale) {
        res.status(404).send({
          message: "Not Found",
        });
      } else {
        res.status(200).json(sale);
      }
    } catch (e) {
      debug(e);
      res.status(500).send({
        message: "Internal Server Error",
      });
      next(e);
    }
  },
  addSale: async (req, res, next) => {
    try {
      const { body } = req;
      if (!body || Object.keys(body).length === 0) {
        res.status(400).send({
          message: "Bad Request",
        });
      } else {
        const newSale = await SaleServices.create(body);
        res.status(201).json({
          message: "Sale Created",
          body: newSale,
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
  enableSale: async (req, res, next) => {
    try {
      const {
        params: { id },
      } = req;
      const { body } = req;
      let enableSale = await SaleServices.enable(id, body);
      if (!enableSale) {
        res.status(404).send({
          message: "Not Found",
        });
      } else {
        res.status(200).json({
          message: "Sale Enabled",
          body: enableSale,
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
  disableSale: async (req, res, next) => {
    try {
      const {
        params: { id },
      } = req;
      const { body } = req;
      let disableSale = await SaleServices.disable(id, body);
      if (!disableSale) {
        res.status(404).send({
          message: "Not Found",
        });
      } else {
        res.status(200).json({
          message: "Sale Disabled",
          body: disableSale,
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
  GetGraph12Months: async (req, res, next) => {
    try {
    } catch (e) {
      debug(e);
      res.status(500).send({
        message: "Internal Server Error",
      });
      next(e);
    }
  },
};
