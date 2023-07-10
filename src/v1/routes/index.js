import routerx from "express-promise-router";
import categoryRoute from "./categoryRoute.js";
import articleRoute from "./articleRoute.js";
import usersRoute from "./userRoute.js";
import personsRoute from "./personsRoute.js";
import incomesRoute from "./incomeRoute.js";
import salesRoute from "./saleRoute.js";

const router = routerx();

router.use("/api/v1/categories", categoryRoute);
router.use("/api/v1/articles", articleRoute);
router.use("/api/v1/users", usersRoute);
router.use("/api/v1/persons", personsRoute);
router.use("/api/v1/incomes", incomesRoute);
router.use("/api/v1/sales", salesRoute);

export default router;
