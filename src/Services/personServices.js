import Models from "../Models/index.js";
export default {
  getAllPerson: async (body) => {
    // Aplica consultas mas preparadas de mongodb, en este caso no se vera created_at y los demas si se mostraran ademas se filtrara de manera desc el created_at.
    // Tambien aplicara busquedas dependiendo del valor q le pasemos
    let value = body.value;
    return await Models.Person.find(
      {
        $or: [
          { name: new RegExp(value, "i") },
          { email: new RegExp(value, "i") },
        ],
      },
      { created_at: 0 }
    ).sort({
      created_at: -1,
    });
  },
  getClients: async (body) => {
    let value = body.value;
    return await Models.Person.find(
      {
        $or: [
          { name: new RegExp(value, "i") },
          { email: new RegExp(value, "i") },
        ],
        type_person: "Client",
      },
      { created_at: 0 }
    ).sort({
      created_at: -1,
    });
  },
  getProviders: async (body) => {
    let value = body.value;
    return await Models.Person.find(
      {
        $or: [
          { name: new RegExp(value, "i") },
          { email: new RegExp(value, "i") },
        ],
        type_person: "Provider",
      },
      { created_at: 0 }
    ).sort({
      created_at: -1,
    });
  },
  getPerson: async (id) => {
    return await Models.Person.findById(id);
  },
  createPerson: async (person) => {
    return await Models.Person.create(person);
  },
  updatePerson: async (id, person) => {
    // const selectedPerson = await Models.User.findById(id);
    let result = await Models.Person.findByIdAndUpdate(
      id,
      {
        type_person: person.rol,
        name: person.name,
        document_type: person.document_type,
        document_num: person.document_num,
        address: person.address,
        phone: person.phone,
        email: person.email,
      },
      {
        new: true,
      }
    );
    return result;
  },

  deletePerson: async (id) => {
    let result = await Models.Person.findByIdAndDelete(id);
    return result;
  },
  enablePerson: async (id, person) => {
    let result = await Models.Person.findByIdAndUpdate(
      id,
      { status: person.status },
      {
        new: true,
      }
    );
    return result;
  },
  disablePerson: async (id, person) => {
    let result = await Models.Person.findByIdAndUpdate(
      id,
      { status: person.status },
      {
        new: true,
      }
    );
    return result;
  },
};
