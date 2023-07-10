import authServices from "../Services/authServices.js";
import debug from "debug";
const logger = debug("app:module-AuthController");

export default {
  login: async (req, res, next) => {
    try {
      const { body } = req;
      let user = await authServices.login(body);
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
          data: user,
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
