import Models from "../Models/index.js";
export default {
  getAll: async (body) => {
    // Aplica consultas mas preparadas de mongodb, en este caso no se vera created_at y los demas si se mostraran ademas se filtrara de manera desc el created_at.
    // Tambien aplicara busquedas dependiendo del valor q le pasemos
    let value = body.value;
    return await Models.Category.find(
      {
        $or: [
          { name: new RegExp(value, "i") },
          { description: new RegExp(value, "i") },
        ],
      },
      { created_at: 0 }
    ).sort({
      created_at: -1,
    });
  },
  getById: async (id) => {
    return await Models.Category.findById(id);
  },
  create: async (category) => {
    return await Models.Category.create(category);
  },
  update: async (id, category) => {
    console.log(category);
    let result = await Models.Category.findByIdAndUpdate(
      id,
      {
        name: category.name,
        description: category.description,
      },
      {
        new: true,
      }
    );
    return result;
  },
  delete: async (id) => {
    let result = await Models.Category.findByIdAndDelete(id);
    return result;
  },
  enable: async (id, category) => {
    let result = await Models.Category.findByIdAndUpdate(
      id,
      { status: category.status },
      {
        new: true,
      }
    );
    return result;
  },
  disable: async (id, category) => {
    let result = await Models.Category.findByIdAndUpdate(
      id,
      { status: category.status },
      {
        new: true,
      }
    );
    return result;
  },
};
