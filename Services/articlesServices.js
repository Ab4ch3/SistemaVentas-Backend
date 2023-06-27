import Models from "../Models";
export default {
  getAll: async (body) => {
    // Aplica consultas mas preparadas de mongodb, en este caso no se vera created_at y los demas si se mostraran ademas se filtrara de manera desc el created_at.
    // Tambien aplicara busquedas dependiendo del valor q le pasemos
    let value = body.value;
    return await Models.Article.find(
      {
        $or: [
          { name: new RegExp(value, "i") },
          { description: new RegExp(value, "i") },
        ],
      },
      { created_at: 0 }
    )
      // populate nos permite hace referencia y previamente creada en el modelo , con el nombre del modelo a relacionar y el campo q quiero q muestre de esa relacion
      .populate("category", { name: 1 })
      .sort({
        created_at: -1,
      });
  },
  getById: async (id) => {
    return await Models.Article.findById(id).populate("category", { name: 1 });
  },
  getByBarCode: async (article) => {
    return await Models.Article.findOne({ code: article.code }).populate(
      "category",
      { name: 1 }
    );
  },
  create: async (article) => {
    return await Models.Article.create(article);
  },
  update: async (id, article) => {
    let result = await Models.Article.findByIdAndUpdate(
      id,
      {
        category: article.category,
        code: article.code,
        name: article.name,
        description: article.description,
        sell_price: article.sell_price,
        stock: article.stock,
      },
      {
        new: true,
      }
    );
    return result;
  },
  delete: async (id) => {
    let result = await Models.Article.findByIdAndDelete(id);
    return result;
  },
  enable: async (id, article) => {
    let result = await Models.Article.findByIdAndUpdate(
      id,
      { status: article.status },
      {
        new: true,
      }
    );
    return result;
  },
  disable: async (id, article) => {
    let result = await Models.Article.findByIdAndUpdate(
      id,
      { status: article.status },
      {
        new: true,
      }
    );
    return result;
  },
};
