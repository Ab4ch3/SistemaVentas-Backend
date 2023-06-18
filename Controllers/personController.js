import personServices from "../Services/personServices";
const debug = require("debug")("app:module-PersonController");

export default {
  getAllPerson: async (req, res, next) => {
    try {
      const { body } = req;
      const person = await personServices.getAll(body);
      res.status(200).json(person);
    } catch (e) {
      debug(e);
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
      let person = await personServices.getById(id);
      if (!person) {
        res.status(404).send({
          message: "Not Found",
        });
      } else {
        res.status(200).json(person);
      }
    } catch (e) {
      debug(e);
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
      res.status(200).json(clients);
    } catch (e) {
      debug(e);
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
      res.status(200).json(providers);
    } catch (e) {
      debug(e);
      res.status(500).send({
        message: "Internal Server Error",
      });

      next(e);
    }
  },
  addPerson: async (req, res, next) => {
    try {
      const { body } = req;
      if (!body || Object.keys(body).length === 0) {
        res.status(400).send({
          message: "Bad Request",
        });
      } else {
        const newPerson = await personServices.create(body);
        res.status(201).json({
          message: "Person Created",
          body: newPerson,
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
  updatePerson: async (req, res, next) => {
    try {
      const {
        params: { id },
      } = req;
      const { body } = req;
      let personUpdate = await personServices.update(id, body);
      if (!personUpdate) {
        res.status(404).send({
          message: "Not Found",
        });
      } else {
        res.status(200).json({
          message: "Person Updated",
          body: personUpdate,
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

  removePerson: async (req, res, next) => {
    try {
      const {
        params: { id },
      } = req;
      let personDeleted = await personServices.delete(id);
      if (!personDeleted) {
        res.status(404).send({
          message: "Not Found",
        });
      } else {
        res.status(200).json({
          message: "Person Deleted",
          body: personDeleted,
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
  enablePerson: async (req, res, next) => {
    try {
      const {
        params: { id },
      } = req;
      const { body } = req;
      let enablePerson = await personServices.enable(id, body);
      if (!enablePerson) {
        res.status(404).send({
          message: "Not Found",
        });
      } else {
        res.status(200).json({
          message: "Person Enabled",
          body: enablePerson,
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
  disablePerson: async (req, res, next) => {
    try {
      const {
        params: { id },
      } = req;
      const { body } = req;
      let disablePerson = await personServices.disable(id, body);
      if (!disablePerson) {
        res.status(404).send({
          message: "Not Found",
        });
      } else {
        res.status(200).json({
          message: "Person Disabled",
          body: disablePerson,
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
