import Models from "../Models";
import bcrypt from "bcryptjs";
import token from "./token.js";
export default {
  getAll: async (body) => {
    // Aplica consultas mas preparadas de mongodb, en este caso no se vera created_at y los demas si se mostraran ademas se filtrara de manera desc el created_at.
    // Tambien aplicara busquedas dependiendo del valor q le pasemos
    let value = body.value;
    return await Models.User.find(
      {
        $or: [
          { name: new RegExp(value, "i") },
          { email: new RegExp(value, "i") },
        ],
      },
      { created_at: 0 }
    ).sort({
      created_at: -1,
    });
  },
  getById: async (id) => {
    return await Models.User.findById(id);
  },
  create: async (user) => {
    console.log(user, "desde user services");
    // Encriptamos el password antes de pasarlo al servicio para crear el usuario
    user.password = await bcrypt.hash(user.password, 10);
    return await Models.User.create(user);
  },
  update: async (id, user) => {
    const selectedUser = await Models.User.findById(id);
    let result = await Models.User.findByIdAndUpdate(
      id,
      {
        rol: user.rol,
        name: user.name,
        document_type: user.document_type,
        document_num: user.document_num,
        address: user.address,
        phone: user.phone,
        email: user.email,
      },
      {
        new: true,
      }
    );
    return result;
  },

  updatePassword: async (id, user) => {
    if (user.hasOwnProperty("password")) {
      let pass = user.password;
      const selectedUser = await Models.User.findById(id);

      if (pass != selectedUser.password) {
        user.password = await bcrypt.hash(user.password, 10);
      }
      let result = await Models.User.findByIdAndUpdate(
        id,
        {
          password: user.password,
        },
        {
          new: true,
        }
      );
      return result;
    } else {
      return;
    }
  },
  delete: async (id) => {
    let result = await Models.User.findByIdAndDelete(id);
    return result;
  },
  enable: async (id, user) => {
    let result = await Models.User.findByIdAndUpdate(
      id,
      { status: user.status },
      {
        new: true,
      }
    );
    return result;
  },
  disable: async (id, user) => {
    let result = await Models.User.findByIdAndUpdate(
      id,
      { status: user.status },
      {
        new: true,
      }
    );
    return result;
  },
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
