import routerx from "express-promise-router";
import categoriesRoute from "./categoriesRoute.js";
import articlesRoute from "./articlesRoute.js";
import usersRoute from "./userRoute.js";
import personRoute from "./personsRoute.js";
import incomeRoute from "./incomeRoute.js";
import saleRoute from "./saleRoute.js";

const router = routerx();

router.use("/api/v1/categories", categoriesRoute);
router.use("/api/v1/articles", articlesRoute);
router.use("/api/v1/users", usersRoute);
router.use("/api/v1/persons", personRoute);
router.use("/api/v1/income", incomeRoute);
router.use("/api/v1/sale", saleRoute);

export default router;
