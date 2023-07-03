import usersServices from "../Services/usersServices.js";
// const debug = require("debug")("app:module-UserController");
import debug from "debug";
const logger = debug("app:module-UserController");

export default {
  getUsers: async (req, res, next) => {
    try {
      const { body } = req;
      const users = await usersServices.getAll(body);
      res.status(200).json(users);
    } catch (e) {
      logger(e);
      res.status(500).send({
        message: "Internal Server Error",
      });

      next(e);
    }
  },
  getUser: async (req, res, next) => {
    try {
      const {
        params: { id },
      } = req;
      let user = await usersServices.getById(id);
      if (!user) {
        res.status(404).send({
          message: "Not Found",
        });
      } else {
        res.status(200).json(user);
      }
    } catch (e) {
      logger(e);
      res.status(500).send({
        message: "Internal Server Error",
      });
      next(e);
    }
  },
  addUser: async (req, res, next) => {
    try {
      const { body } = req;
      if (!body || Object.keys(body).length === 0) {
        res.status(400).send({
          message: "Bad Request",
        });
      } else {
        const newUser = await usersServices.create(body);
        res.status(201).json({
          message: "User Created",
          body: newUser,
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
  updateUser: async (req, res, next) => {
    try {
      const {
        params: { id },
      } = req;
      const { body } = req;
      let userUpdate = await usersServices.update(id, body);
      if (!userUpdate) {
        res.status(404).send({
          message: "Not Found",
        });
      } else {
        res.status(200).json({
          message: "User Updated",
          body: userUpdate,
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
  updatePassword: async (req, res, next) => {
    try {
      const {
        params: { id },
      } = req;
      const { body } = req;
      let passwordUpdated = await usersServices.updatePassword(id, body);
      if (!passwordUpdated) {
        res.status(404).send({
          message: "Not Found",
        });
      } else {
        res.status(200).json({
          message: "Password Updated",
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
  removeUser: async (req, res, next) => {
    try {
      const {
        params: { id },
      } = req;
      let userDeleted = await usersServices.delete(id);
      if (!userDeleted) {
        res.status(404).send({
          message: "Not Found",
        });
      } else {
        res.status(200).json({
          message: "User Deleted",
          body: userDeleted,
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
  enableUser: async (req, res, next) => {
    try {
      const {
        params: { id },
      } = req;
      const { body } = req;
      let enableUser = await usersServices.enable(id, body);
      if (!enableUser) {
        res.status(404).send({
          message: "Not Found",
        });
      } else {
        res.status(200).json({
          message: "User Enabled",
          body: enableUser,
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
  disableUser: async (req, res, next) => {
    try {
      const {
        params: { id },
      } = req;
      const { body } = req;
      let disableUser = await usersServices.disable(id, body);
      if (!disableUser) {
        res.status(404).send({
          message: "Not Found",
        });
      } else {
        res.status(200).json({
          message: "User Disabled",
          body: disableUser,
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
  login: async (req, res, next) => {
    try {
      const { body } = req;
      let user = await usersServices.login(body);
      if (!user) {
        return res.status(404).send({
          message: "User Not Found",
        });
      }
      if (Object.hasOwn(user, "error")) {
        res.status(401).json({
          message: "Unauthorized",
          body: user.error,
        });
      } else {
        res.status(200).json({
          message: "Login Successfull",
          body: user,
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
