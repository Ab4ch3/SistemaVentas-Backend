// Importamos Router
import routerx from "express-promise-router";
// Importamos el Controlador
import userController from "../../Controllers/userController.js";
//Importamos middleware
import auth from "../../middlewares/auth.js";
// Asignamos Router
const router = routerx();

// Espeficiamos Rutas
router
  .get("/", auth.verifyUserAdmin, userController.getAllUsers)
  .post("/", auth.verifyUserAdmin, userController.createUser)
  .get("/:userId", auth.verifyUserAdmin, userController.getUser)
  .put("/:userId", auth.verifyUserAdmin, userController.updateUser)
  .patch(
    "/:userId/password",
    auth.verifyUserAuth,
    userController.updatePassword
  )
  .patch("/:userId/disable", auth.verifyUserAdmin, userController.disableUser)
  .patch("/:userId/enable", auth.verifyUserAdmin, userController.enableUser)
  .delete("/:userId", auth.verifyUserAdmin, userController.deleteUser);

export default router;
