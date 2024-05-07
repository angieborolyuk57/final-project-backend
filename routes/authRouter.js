const express = require("express");

const { authenticate, validateBody, upload } = require("../helpers");
const { schemas } = require("../models/users");
const ctrl = require("../controllers/authControllers");

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(schemas.registerSchema),
  ctrl.register
);

authRouter.post("/login", validateBody(schemas.loginSchema), ctrl.login);

authRouter.get("/current", authenticate, ctrl.getCurrent);

authRouter.post("/logout", ctrl.logout);

authRouter.patch("/avatars", upload.single("avatarURL"), ctrl.updateUser);

authRouter.patch(
  "/theme",
  validateBody(schemas.updateThemeSchema),
  ctrl.updateUserTheme
);

module.exports = authRouter;
