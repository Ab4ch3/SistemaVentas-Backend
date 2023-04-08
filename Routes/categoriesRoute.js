import routerx from "express-promise-router";
import categoryController from "../Controllers/categoryController";
const router = routerx();

router.get("/", categoryController.getCategories);

export default router;
