// Importamos Router
import routerx from "express-promise-router";
// Importamos el Controlador
import articleController from "../Controllers/articleController";
//Importamos middleware
import auth from "../middlewares/auth.js";
// Asignamos Router
const router = routerx();

// Espeficiamos Rutas
router
  .get("/", auth.verifyUserStorekeeper, articleController.getArticles)
  .post("/add", auth.verifyUserStorekeeper, articleController.addArticle)
  .get("/:id", auth.verifyUserStorekeeper, articleController.getArticle)
  .put(
    "/update/:id",
    auth.verifyUserStorekeeper,
    articleController.updateArticle
  )
  .put(
    "/enable/:id",
    auth.verifyUserStorekeeper,
    articleController.enableArticle
  )
  .put(
    "/disable/:id",
    auth.verifyUserStorekeeper,
    articleController.disableArticle
  )
  .delete(
    "/delete/:id",
    auth.verifyUserStorekeeper,
    articleController.removeArticle
  );

export default router;
