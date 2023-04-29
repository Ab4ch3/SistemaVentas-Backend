/* 
  Archivo Main Router
*/
import routerx from "express-promise-router";
import categoriesRoute from "./categoriesRoute.js";
import articlesRoute from "./articlesRoute.js";
const router = routerx();

router.use("/api/categories", categoriesRoute);
router.use("/api/articles", articlesRoute);

export default router;
