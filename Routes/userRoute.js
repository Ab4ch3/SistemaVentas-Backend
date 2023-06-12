// Importamos Router
import routerx from "express-promise-router";
// Importamos el Controlador
import userController from "../Controllers/userController";
//Importamos middleware
import auth from "../middlewares/auth.js";
// Asignamos Router
const router = routerx();

// Espeficiamos Rutas
router
  .get("/", auth.verifyUserAdmin, userController.getUsers)
  .post("/add", auth.verifyUserAdmin, userController.addUser)
  .post("/login", userController.login)
  .get("/:id", auth.verifyUserAdmin, userController.getUser)
  .put("/update/:id", auth.verifyUserAdmin, userController.updateUser)
  .put("/enable/:id", auth.verifyUserAdmin, userController.enableUser)
  .put("/disable/:id", auth.verifyUserAdmin, userController.disableUser)
  .delete("/delete/:id", auth.verifyUserAdmin, userController.removeUser);

export default router;
