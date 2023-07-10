// Importamos Router
import routerx from "express-promise-router";
// Importamos el Controlador
import articleController from "../../Controllers/articleController.js";
//Importamos middleware
import auth from "../../middlewares/auth.js";
// Asignamos Router
const router = routerx();

// Espeficiamos Rutas
router
  .get("/", auth.verifyUserStorekeeper, articleController.getAllArticles)
  .post("/add", auth.verifyUserStorekeeper, articleController.createArticle)
  .get("/code", auth.verifyUserAuth, articleController.getArticleByBarCode)
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
    articleController.deleteArticle
  );

export default router;
