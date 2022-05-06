const express = require("express");
const userController = require("./../controllers/user.controller");

const router = express.Router();

router.post("/sign-in", userController.signUp);
router.post("/login", userController.login)

module.exports = router;