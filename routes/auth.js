const express = require("express");

const validateBody = require("../helpers/validateBody");
const { schemas } = require("../models/users");
const ctrl = require("../controllers/auth");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", ctrl.getCurrent);

router.post("/logout", ctrl.logout);

module.exports = router;
