import userServices from "../Services/userServices.js";
import debug from "debug";
const logger = debug("app:module-UserController");

export default {
  getAllUsers: async (req, res, next) => {
    try {
      const { body } = req;
      const users = await userServices.getAllUsers(body);
      res.status(200).json({ data: users });
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
        params: { userId },
      } = req;
      let user = await userServices.getUser(userId);
      if (!user) {
        res.status(404).send({
          message: "Not Found",
        });
      } else {
        res.status(200).json({ data: user });
      }
    } catch (e) {
      logger(e);
      res.status(500).send({
        message: "Internal Server Error",
      });
      next(e);
    }
  },
  createUser: async (req, res, next) => {
    try {
      const { body } = req;
      if (!body || Object.keys(body).length === 0) {
        res.status(400).send({
          message: "Bad Request",
        });
      } else {
        const createdUser = await userServices.createUser(body);
        res.status(201).json({
          message: "User Created",
          data: createdUser,
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
        params: { userId },
      } = req;
      const { body } = req;
      let UpdatedUser = await userServices.updateUser(userId, body);
      if (!UpdatedUser) {
        res.status(404).send({
          message: "Not Found",
        });
      } else {
        res.status(200).json({
          message: "User Updated",
          data: UpdatedUser,
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
        params: { userId },
      } = req;
      const { body } = req;
      let updatedPassword = await userServices.updatePassword(userId, body);
      if (!updatedPassword) {
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
  deleteUser: async (req, res, next) => {
    try {
      const {
        params: { userId },
      } = req;
      let deletedUser = await userServices.deleteUser(userId);
      if (!deletedUser) {
        res.status(404).send({
          message: "Not Found",
        });
      } else {
        res.status(200).json({
          message: "User Deleted",
          data: deletedUser,
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
        params: { userId },
      } = req;
      const { body } = req;
      let enabledUser = await userServices.enableUser(userId, body);
      if (!enabledUser) {
        res.status(404).send({
          message: "Not Found",
        });
      } else {
        res.status(200).json({
          message: "User Enabled",
          data: enabledUser,
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
        params: { userId },
      } = req;
      const { body } = req;
      let disabledUser = await userServices.disableUser(userId, body);
      if (!disabledUser) {
        res.status(404).send({
          message: "Not Found",
        });
      } else {
        res.status(200).json({
          message: "User Disabled",
          data: disabledUser,
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
