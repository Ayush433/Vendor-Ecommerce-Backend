const express = require("express");
const router = express.Router();

const auth = require("../../Middleware/auth");
const userController = require("../../Controller/userController");

router.post("/signUp", userController.userSignup);
router.post("/login", userController.userLogin);

module.exports = router;
