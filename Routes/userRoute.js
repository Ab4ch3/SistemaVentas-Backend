// Importamos Router
import routerx from "express-promise-router";
// Importamos el Controlador
import userController from "../Controllers/userController";
// Asignamos Router
const router = routerx();

// Espeficiamos Rutas
router
  .get("/", userController.getUsers)
  .post("/add", userController.addUser)
  .post("/login", userController.login)
  .get("/:id", userController.getUser)
  .put("/update/:id", userController.updateUser)
  .put("/enable/:id", userController.enableUser)
  .put("/disable/:id", userController.disableUser)
  .delete("/delete/:id", userController.removeUser);

export default router;
