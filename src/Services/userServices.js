import Models from "../Models/index.js";
import bcrypt from "bcryptjs";
export default {
  getAllUsers: async (body) => {
    /* Aplica consultas mas preparadas de mongodb, en este caso no se vera created_at y los demas si se mostraran ademas se filtrara de manera desc el created_at.
    Tambien aplicara busquedas dependiendo del valor q le pasemos */
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
  getUser: async (userId) => {
    return await Models.User.findById(userId);
  },
  createUser: async (user) => {
    // Encriptamos el password antes de pasarlo al servicio para crear el usuario
    user.password = await bcrypt.hash(user.password, 10);
    return await Models.User.create(user);
  },
  updateUser: async (userId, user) => {
    const selectedUser = await Models.User.findById(userId);
    let result = await Models.User.findByIdAndUpdate(
      userId,
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

  updatePassword: async (userId, user) => {
    if (user.hasOwnProperty("password")) {
      let pass = user.password;
      const selectedUser = await Models.User.findById(userId);

      if (pass != selectedUser.password) {
        user.password = await bcrypt.hash(user.password, 10);
      }
      let result = await Models.User.findByIdAndUpdate(
        userId,
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
  deleteUser: async (userId) => {
    let result = await Models.User.findByIdAndDelete(userId);
    return result;
  },
  enableUser: async (userId, user) => {
    let result = await Models.User.findByIdAndUpdate(
      userId,
      { status: user.status },
      {
        new: true,
      }
    );
    return result;
  },
  disableUser: async (userId, user) => {
    let result = await Models.User.findByIdAndUpdate(
      userId,
      { status: user.status },
      {
        new: true,
      }
    );
    return result;
  },
};
