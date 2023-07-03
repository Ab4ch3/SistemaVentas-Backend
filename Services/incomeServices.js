import Models from "../Models/index.js";

const incrementStock = async (id, amount) => {
  let { stock } = await Models.Article.findOne({ _id: id });
  let nStock = parseInt(stock) + parseInt(amount);
  const reg = await Models.Article.findByIdAndUpdate(
    { _id: id },
    { stock: nStock }
  );
};

const reduceStock = async (id, amount) => {
  let { stock } = await Models.Article.findOne({ _id: id });
  let nStock = parseInt(stock) - parseInt(amount);
  const reg = await Models.Article.findByIdAndUpdate(
    { _id: id },
    { stock: nStock }
  );
};

export default {
  getAll: async (body) => {
    // Aplica consultas mas preparadas de mongodb, en este caso no se vera created_at y los demas si se mostraran ademas se filtrara de manera desc el created_at.
    // Tambien aplicara busquedas dependiendo del valor q le pasemos
    let value = body.value;
    return await Models.Income.find({
      $or: [
        { voucher_num: new RegExp(value, "i") },
        { voucher_series: new RegExp(value, "i") },
      ],
    })
      .populate("user", { name: 1 }) //en este caso buscando en la coleccion user , el nombre de ese Income
      .populate("person", { name: 1 }) //en este caso buscando en la coleccion person , el nombre de ese Income;
      .sort({
        created_at: -1,
      });
  },
  getById: async (id) => {
    return await Models.Income.findById(id)
      //Populate nos permite buscar referencias en otras colecciones
      .populate("user", { name: 1 }) //en este caso buscando en la coleccion user , el nombre de ese Income
      .populate("person", { name: 1 }); //en este caso buscando en la coleccion person , el nombre de ese Income;
  },

  create: async (income) => {
    let newIncome = await Models.Income.create(income);
    //Actualizamos el stock
    //Recorremos cada unos de los objetos
    let details = newIncome.details;
    details.map((item) => {
      incrementStock(item._id, item.total_article);
    });
    return newIncome;
  },

  enable: async (id, income) => {
    let result = await Models.Income.findByIdAndUpdate(
      id,
      { status: income.status },
      {
        new: true,
      }
    );
    //Actualizamos el stock
    //Recorremos cada unos de los objetos
    let details = result.details;
    details.map((item) => {
      incrementStock(item._id, item.total_article);
    });
    return result;
  },
  disable: async (id, income) => {
    let result = await Models.Income.findByIdAndUpdate(
      id,
      { status: income.status },
      {
        new: true,
      }
    );
    //Actualizamos el stock
    //Recorremos cada unos de los objetos
    let details = result.details;
    details.map((item) => {
      reduceStock(item._id, item.total_article);
    });

    return result;
  },
};
