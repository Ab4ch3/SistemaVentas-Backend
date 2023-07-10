// Importamos Router
import routerx from "express-promise-router";
// Importamos el Controlador
import incomeController from "../../Controllers/incomeController.js";
//Importamos middleware
import auth from "../../middlewares/auth.js";
// Asignamos Router
const router = routerx();

// Espeficiamos Rutas
router
  .get("/", auth.verifyUserStorekeeper, incomeController.getAllIncome)
  .get("/checkDates", auth.verifyUserAuth, incomeController.getCheckDates)
  .get("/graph12", auth.verifyUserAuth, incomeController.getGraph12Months)
  .post("/add", auth.verifyUserStorekeeper, incomeController.createNewIncome)
  .get("/:id", auth.verifyUserStorekeeper, incomeController.getIncome)
  .put("/enable/:id", auth.verifyUserStorekeeper, incomeController.enableIncome)
  .put(
    "/disable/:id",
    auth.verifyUserStorekeeper,
    incomeController.disableIncome
  );

export default router;
