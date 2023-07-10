import Models from "../Models/index.js";
export default {
  getAllArticles: async (body) => {
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
  getArticle: async (id) => {
    return await Models.Article.findById(id).populate("category", { name: 1 });
  },
  getArticleByBarCode: async (article) => {
    return await Models.Article.findOne({ code: article.code }).populate(
      "category",
      { name: 1 }
    );
  },
  createArticle: async (article) => {
    return await Models.Article.create(article);
  },
  updateArticle: async (id, article) => {
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
  deleteArticle: async (id) => {
    let result = await Models.Article.findByIdAndDelete(id);
    return result;
  },
  enableArticle: async (id, article) => {
    let result = await Models.Article.findByIdAndUpdate(
      id,
      { status: article.status },
      {
        new: true,
      }
    );
    return result;
  },
  disableArticle: async (id, article) => {
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
