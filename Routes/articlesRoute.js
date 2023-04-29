// Importamos Router
import routerx from "express-promise-router";
// Importamos el Controlador
import articleController from "../Controllers/articleController";
// Asignamos Router
const router = routerx();

// Espeficiamos Rutas
router
  .get("/", articleController.getArticles)
  .post("/add", articleController.addArticle)
  .get("/:id", articleController.getArticle)
  .put("/update/:id", articleController.updateArticle)
  .put("/enable/:id", articleController.enableArticle)
  .put("/disable/:id", articleController.disableArticle)
  .delete("/delete/:id", articleController.removeArticle);

export default router;
