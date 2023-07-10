import Models from "../Models/index.js";
import bcrypt from "bcryptjs";
import token from "./token.js";
export default {
  login: async (user) => {
    let selectedUser = await Models.User.findOne({
      email: user.email,
      status: true,
    });

    if (selectedUser) {
      let match = await bcrypt.compare(user.password, selectedUser.password);

      if (match) {
        let tokenReturn = await token.encode(selectedUser._id);
        return { selectedUser, tokenReturn };
      } else {
        return { error: "Password Incorrect" };
      }
    } else {
      return; //envia undefined
    }
  },
};
