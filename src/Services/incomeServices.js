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
  getAllIncome: async (body) => {
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
  getIncome: async (id) => {
    return await Models.Income.findById(id)
      //Populate nos permite buscar referencias en otras colecciones
      .populate("user", { name: 1 }) //en este caso buscando en la coleccion user , el nombre de ese Income
      .populate("person", { name: 1 }); //en este caso buscando en la coleccion person , el nombre de ese Income;
  },

  createNewIncome: async (income) => {
    let newIncome = await Models.Income.create(income);
    //Actualizamos el stock
    //Recorremos cada unos de los objetos
    let details = newIncome.details;
    details.map((item) => {
      incrementStock(item._id, item.total_article);
    });
    return newIncome;
  },

  enableIncome: async (id, income) => {
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
  disableIncome: async (id, income) => {
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
  getGraph12Months: async () => {
    const result = await Models.Income.aggregate([
      {
        $group: {
          _id: {
            month: { $month: "$created_at" },
            year: { $year: "$created_at" },
          },
          total: {
            $sum: "$total",
          },
          number: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          "_id.year": -1,
          "_id.month": -1,
        },
      },
    ]).limit(12);

    return result;
  },
  checkDates: async (dates) => {
    let start = dates.start;
    let end = dates.end;

    const result = await Models.Income.find({
      created_at: { $gte: start, $lt: end },
    })
      .populate("user", { name: 1 }) //en este caso buscando en la coleccion user , el nombre de ese Income
      .populate("person", { name: 1 }) //en este caso buscando en la coleccion person , el nombre de ese Income;
      .sort({
        created_at: -1,
      });

    return result;
  },
};
