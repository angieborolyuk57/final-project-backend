const express = require("express");

const { authenticate, validateBody, upload } = require("../helpers");
const { schemas } = require("../models/users");
const ctrl = require("../controllers/authControllers");
const authControllers = require("../controllers/authControllers");

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(schemas.registerSchema),
  ctrl.register
);

authRouter.post("/login", validateBody(schemas.loginSchema), ctrl.login);

authRouter.get("/current", authenticate, ctrl.getCurrent);

authRouter.post("/logout", ctrl.logout);

authRouter.put(
  "/update",
  authenticate,
  validateBody(schemas.updateUserSchema),
  upload.single("avatarURL"),
  ctrl.updateUser
);

authRouter.patch(
  "/theme",
  authenticate,
  validateBody(schemas.updateThemeSchema),
  ctrl.updateUserTheme
);

module.exports = authRouter;
