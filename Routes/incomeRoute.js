// Importamos Router
import routerx from "express-promise-router";
// Importamos el Controlador
import IncomeController from "../Controllers/incomeController";
//Importamos middleware
import auth from "../middlewares/auth.js";
// Asignamos Router
const router = routerx();

// Espeficiamos Rutas
router
  .get("/", auth.verifyUserStorekeeper, IncomeController.getAllIncome)
  .post("/add", auth.verifyUserStorekeeper, IncomeController.addIncome)
  .get("/:id", auth.verifyUserStorekeeper, IncomeController.getIncome)
  .put("/enable/:id", auth.verifyUserStorekeeper, IncomeController.enableIncome)
  .put(
    "/disable/:id",
    auth.verifyUserStorekeeper,
    IncomeController.disableIncome
  );

export default router;
