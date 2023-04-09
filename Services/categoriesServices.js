import Models from "../Models";
export default {
  getAll: async () => {
    return await Models.Category.find({});
  },
  getById: async (id) => {
    return await Models.Category.findById(id);
  },
  create: async (category) => {
    return await Models.Category.create(category);
  },
  update: async (id, category) => {
    let result = await Models.Category.findByIdAndUpdate(id, category, {
      new: true,
    });
    return result;
  },
};
