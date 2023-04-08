/* 
  Archivo Main Router
*/
import routerx from "express-promise-router";
import categoriesRoute from "./categoriesRoute.js";
const router = routerx();

router.use("/api/categories", categoriesRoute);

export default router;
