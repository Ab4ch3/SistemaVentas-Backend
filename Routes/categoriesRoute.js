// Importamos Router
import routerx from "express-promise-router";
// Importamos el Controlador
import categoryController from "../Controllers/categoryController";
// Asignamos Router
const router = routerx();

// Espeficiamos Rutas
router
  .get("/", categoryController.getCategories)
  .post("/add", categoryController.addCategory)
  .get("/:id", categoryController.getCategory)
  .put("/update/:id", categoryController.updateCategory)
  .put("/enable/:id", categoryController.enableCategory)
  .put("/disable/:id", categoryController.disableCategory)
  .delete("/delete/:id", categoryController.removeCategory);

export default router;
