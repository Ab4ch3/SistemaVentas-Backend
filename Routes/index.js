/* 
  Archivo Main Router
*/
import routerx from "express-promise-router";
import categoriesRoute from "./categoriesRoute.js";
import articlesRoute from "./articlesRoute.js";
import usersRoute from "./userRoute.js";
import personsRoute from "./personsRoute.js";
import incomeRoute from "./incomeRoute.js";
import saleRoute from "./saleRoute.js";
const router = routerx();

router.use("/api/categories", categoriesRoute);
router.use("/api/articles", articlesRoute);
router.use("/api/users", usersRoute);
router.use("/api/persons", personsRoute);
router.use("/api/income", incomeRoute);
router.use("/api/sale", saleRoute);

export default router;
