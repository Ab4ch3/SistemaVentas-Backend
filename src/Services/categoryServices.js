import Models from "../Models/index.js";
export default {
  getAllCategories: async (body) => {
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
  getCategory: async (id) => {
    return await Models.Category.findById(id);
  },
  createNewCategory: async (category) => {
    return await Models.Category.create(category);
  },
  updateCategory: async (id, category) => {
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
  deleteCategory: async (id) => {
    let result = await Models.Category.findByIdAndDelete(id);
    return result;
  },
  enableCategory: async (id, category) => {
    let result = await Models.Category.findByIdAndUpdate(
      id,
      { status: category.status },
      {
        new: true,
      }
    );
    return result;
  },
  disableCategory: async (id, category) => {
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
