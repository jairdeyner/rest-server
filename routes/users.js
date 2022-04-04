const { Router } = require("express");
const { check } = require("express-validator");

const {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
  usersPatch,
} = require("../controllers/users");
const {
  isValidRole,
  existsEmail,
  existsUserById,
} = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.get("/", usersGet);

router.post(
  "/",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe tener más de 6 caracteres").isLength({
      min: 6,
    }),
    check("email", "El correo no es válido").isEmail(),
    check("email").custom(existsEmail),
    // check("rol", "No es un rol permitido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("rol").custom(isValidRole),
    validarCampos,
  ],
  usersPost
);

router.put(
  "/:id",
  [
    check("id", "no es un id válido").isMongoId(),
    check("id").custom(existsUserById),
    check("rol").custom(isValidRole),
    validarCampos,
  ],
  usersPut
);

router.delete(
  "/:id",
  [
    check("id", "no es un id válido").isMongoId(),
    check("id").custom(existsUserById),
    validarCampos,
  ],
  usersDelete
);

router.patch("/", usersPatch);

module.exports = router;
