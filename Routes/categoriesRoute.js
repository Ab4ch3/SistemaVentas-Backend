// Importamos Router
import routerx from "express-promise-router";
// Importamos el Controlador
import categoryController from "../Controllers/categoryController";
// Asignamos Router
const router = routerx();

// Espeficiamos Rutas
router.get("/", categoryController.getCategories);

export default router;
