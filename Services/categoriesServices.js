import Models from "../Models";
export default {
  getAll: async () => {
    return await Models.Category.find({});
  },
};
