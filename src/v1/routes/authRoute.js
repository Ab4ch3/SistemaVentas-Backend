// Importamos Router
import routerx from "express-promise-router";
// Importamos el Controlador
import authController from "../../Controllers/authController.js";

// Asignamos Router
const router = routerx();

// Espeficiamos Rutas
router.post("/signin", authController.login);

export default router;
