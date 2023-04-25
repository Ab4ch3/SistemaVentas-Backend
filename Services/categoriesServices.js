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
