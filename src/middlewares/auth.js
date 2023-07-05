import tokenService from "../Services/token.js";

export default {
  verifyUserAuth: async (req, res, next) => {
    if (!req.headers.token) {
      return res.status(404).send({
        message: "missing token",
      });
    }
    const response = await tokenService.decode(req.headers.token);
    if (
      response.rol == "Administrator" ||
      Response.rol == "Seller" ||
      Response.rol == "StoreKeeper"
    ) {
      next();
    } else {
      return res.status(403).send({
        message: "unAuthorized",
      });
    }
  },
  verifyUserAdmin: async (req, res, next) => {
    if (!req.headers.token) {
      return res.status(404).send({
        message: "no token",
      });
    }
    const response = await tokenService.decode(req.headers.token);
    if (response.rol == "Administrator") {
      next();
    } else {
      return res.status(403).send({
        message: "unAuthorized",
      });
    }
  },
  verifyUserStorekeeper: async (req, res, next) => {
    if (!req.headers.token) {
      return res.status(404).send({
        message: "no token",
      });
    }
    const response = await tokenService.decode(req.headers.token);
    if (response.rol == "Administrator" || Response.rol == "StoreKeeper") {
      next();
    } else {
      return res.status(403).send({
        message: "unAuthorized",
      });
    }
  },
  verifyUserSeller: async (req, res, next) => {
    if (!req.headers.token) {
      return res.status(404).send({
        message: "no token",
      });
    }
    const response = await tokenService.decode(req.headers.token);
    if (response.rol == "Administrator" || Response.rol == "Seller") {
      next();
    } else {
      return res.status(403).send({
        message: "unAuthorized",
      });
    }
  },
};
