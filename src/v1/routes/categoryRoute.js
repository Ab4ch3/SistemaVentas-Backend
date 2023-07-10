// Importamos Router
import routerx from "express-promise-router";
// Importamos el Controlador
import categoryController from "../../Controllers/categoryController.js";
//Importamos middleware
import auth from "../../middlewares/auth.js";
// Asignamos Router
const router = routerx();

// Espeficiamos Rutas
router
  .get("/", auth.verifyUserStorekeeper, categoryController.getAllCategories)
  .post(
    "/add",
    auth.verifyUserStorekeeper,
    categoryController.createNewCategory
  )
  .get(
    "/:idCategory",
    auth.verifyUserStorekeeper,
    categoryController.getCategory
  )
  .put(
    "/update/:id",
    auth.verifyUserStorekeeper,
    categoryController.updateCategory
  )
  .put(
    "/enable/:id",
    auth.verifyUserStorekeeper,
    categoryController.enableCategory
  )
  .put(
    "/disable/:id",
    auth.verifyUserStorekeeper,
    categoryController.disableCategory
  )
  .delete(
    "/delete/:id",
    auth.verifyUserStorekeeper,
    categoryController.deleteCategory
  );

export default router;
