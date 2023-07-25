const express = require("express");
const joi = require("joi");
const validateLoginInput = require("../../Controller/userValidation");
const router = express.Router();
const auth = require("../../Middleware/auth");
const userController = require("../../Controller/userController");
const validation = require("express-joi-validation").createValidator({});

const SignUpSchema = joi.object({
  fullName: joi.string().min(5).max(20).required(),
  email: joi.string().email().required(),
  password: joi.string().required("").max(20),
});
const LoginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(""),
});

router.post(
  "/signUp",
  validation.body(SignUpSchema),
  userController.userSignup
);
router.post("/login", validation.body(LoginSchema), userController.userLogin);

module.exports = router;
