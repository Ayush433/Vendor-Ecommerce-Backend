const express = require("express");
const router = express.Router();
const { upload } = require("../multer");
// const auth = require("../Middleware/auth");
const userController = require("../Controller/userController");

router.post("/api/signup", userController.userSignup);

module.exports = router;
