/* 
  Archivo Main Router
*/
import routerx from "express-promise-router";
import categoriesRoute from "./categoriesRoute.js";
import articlesRoute from "./articlesRoute.js";
import usersRoute from "./userRoute.js";
const router = routerx();

router.use("/api/categories", categoriesRoute);
router.use("/api/articles", articlesRoute);
router.use("/api/users", usersRoute);

export default router;
