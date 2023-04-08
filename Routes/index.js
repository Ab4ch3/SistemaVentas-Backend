import routerx from "express-promise-router";
import categoriesRoute from "./categoriesRoute.js";
const router = routerx();

router.use("/categories", categoriesRoute);

export default router;
