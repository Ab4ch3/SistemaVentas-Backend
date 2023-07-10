import personServices from "../Services/personServices.js";
import debug from "debug";
const logger = debug("app:module-PersonController");

export default {
  getAllPerson: async (req, res, next) => {
    try {
      const { body } = req;
      const AllPersons = await personServices.getAllPerson(body);
      res.status(200).json({ data: AllPersons });
    } catch (e) {
      logger(e);
      res.status(500).send({
        message: "Internal Server Error",
      });

      next(e);
    }
  },
  getPerson: async (req, res, next) => {
    try {
      const {
        params: { id },
      } = req;
      let person = await personServices.getPerson(id);
      if (!person) {
        res.status(404).send({
          message: "Not Found",
        });
      } else {
        res.status(200).json({ data: person });
      }
    } catch (e) {
      logger(e);
      res.status(500).send({
        message: "Internal Server Error",
      });
      next(e);
    }
  },
  getClients: async (req, res, next) => {
    try {
      const { body } = req;
      const clients = await personServices.getClients(body);
      res.status(200).json({ data: clients });
    } catch (e) {
      logger(e);
      res.status(500).send({
        message: "Internal Server Error",
      });

      next(e);
    }
  },
  getProviders: async (req, res, next) => {
    try {
      const { body } = req;
      const providers = await personServices.getProviders(body);
      res.status(200).json({ data: providers });
    } catch (e) {
      logger(e);
      res.status(500).send({
        message: "Internal Server Error",
      });

      next(e);
    }
  },
  createPerson: async (req, res, next) => {
    try {
      const { body } = req;
      if (!body || Object.keys(body).length === 0) {
        res.status(400).send({
          message: "Bad Request",
        });
      } else {
        const createdPerson = await personServices.createPerson(body);
        res.status(201).json({
          message: "Person Created",
          data: createdPerson,
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
  updatePerson: async (req, res, next) => {
    try {
      const {
        params: { id },
      } = req;
      const { body } = req;
      let UpdatedPerson = await personServices.updatePerson(id, body);
      if (!UpdatedPerson) {
        res.status(404).send({
          message: "Not Found",
        });
      } else {
        res.status(200).json({
          message: "Person Updated",
          data: UpdatedPerson,
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

  deletePerson: async (req, res, next) => {
    try {
      const {
        params: { id },
      } = req;
      let DeletedPerson = await personServices.deletePerson(id);
      if (!DeletedPerson) {
        res.status(404).send({
          message: "Not Found",
        });
      } else {
        res.status(200).json({
          message: "Person Deleted",
          data: DeletedPerson,
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
  enablePerson: async (req, res, next) => {
    try {
      const {
        params: { id },
      } = req;
      const { body } = req;
      let enabledPerson = await personServices.enablePerson(id, body);
      if (!enabledPerson) {
        res.status(404).send({
          message: "Not Found",
        });
      } else {
        res.status(200).json({
          message: "Person Enabled",
          data: enabledPerson,
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
  disablePerson: async (req, res, next) => {
    try {
      const {
        params: { id },
      } = req;
      const { body } = req;
      let disabledPerson = await personServices.disablePerson(id, body);
      if (!disabledPerson) {
        res.status(404).send({
          message: "Not Found",
        });
      } else {
        res.status(200).json({
          message: "Person Disabled",
          data: disabledPerson,
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
