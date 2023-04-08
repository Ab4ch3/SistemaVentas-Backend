import Models from "../Models";
export default {
  getCategories: async (req, res, next) => {
    try {
      console.log("llego aca");
      const reg = await Models.Category.find({});
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrio un error",
      });
      next(e);
    }
  },
};
