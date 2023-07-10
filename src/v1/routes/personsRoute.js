// Importamos Router
import routerx from "express-promise-router";
// Importamos el Controlador
import personController from "../../Controllers/personController.js";
//Importamos middleware
import auth from "../../middlewares/auth.js";
// Asignamos Router
const router = routerx();

// Espeficiamos Rutas
router
  .get("/", auth.verifyUserAuth, personController.getAllPerson)
  .get("/clients", auth.verifyUserAuth, personController.getClients)
  .get("/providers", auth.verifyUserAuth, personController.getProviders)
  .post("/add", auth.verifyUserAuth, personController.createPerson)
  .get("/:id", auth.verifyUserAuth, personController.getPerson)
  .put("/update/:id", auth.verifyUserAuth, personController.updatePerson)
  .put("/enable/:id", auth.verifyUserAuth, personController.enablePerson)
  .put("/disable/:id", auth.verifyUserAuth, personController.disablePerson)
  .delete("/delete/:id", auth.verifyUserAuth, personController.deletePerson);

export default router;
