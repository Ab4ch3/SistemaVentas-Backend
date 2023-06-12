import jwt from "jsonwebtoken";
import Models from "../Models";
const debug = require("debug")("app:services-token");

async function checkToken(token) {
  let __id = null;
  try {
    const { _id } = await jwt.decode(token);
    __id = _id;
  } catch (e) {
    debug(e);
    return false;
  }
  const user = await Models.User.findOne({ _id: __id });
  if (user) {
    const token = jwt.sign({ _id: _id }, "claveSecreta", { expiresIn: "1d" });
    return { token, rol: user.rol };
  } else {
    return false;
  }
}

export default {
  encode: async (_id) => {
    // Jsonwebtoken , el metodo sign recibe 3 paramentro , el id del usuairo , una clave secreta , y la duracion
    const token = jwt.sign({ _id: _id }, "claveSecreta", { expiresIn: "1d" });
    return token;
  },
  decode: async (token) => {
    try {
      const { _id } = jwt.verify(token, "claveSecreta");
      const user = await Models.User.findOne({ _id, status: true });
      if (user) {
        return user;
      } else {
        return false;
      }
    } catch (e) {
      const newToken = await checkToken(token);
      return newToken;
      debug(e);
    }
  },
};
