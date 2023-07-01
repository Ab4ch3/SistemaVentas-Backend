// Importamos Router
import routerx from "express-promise-router";
// Importamos el Controlador
import SaleController from "../Controllers/saleController";
//Importamos middleware
import auth from "../middlewares/auth.js";
// Asignamos Router
const router = routerx();

// Espeficiamos Rutas
router
  .get("/", auth.verifyUserSeller, SaleController.getAllSale)
  .post("/add", auth.verifyUserSeller, SaleController.addSale)
  .get("/:id", auth.verifyUserSeller, SaleController.getSale)
  .put("/enable/:id", auth.verifyUserSeller, SaleController.enableSale)
  .put("/disable/:id", auth.verifyUserSeller, SaleController.disableSale);

export default router;
