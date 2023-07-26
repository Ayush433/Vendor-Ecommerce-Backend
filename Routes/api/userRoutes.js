const express = require("express");
const joi = require("joi");
const router = express.Router();
const auth = require("../../Middleware/auth");
const userController = require("../../Controller/userController");
const validation = require("express-joi-validation").createValidator({});
const userValidation = require("../../Controller/userValidation");

const customMessages = {
  "string.base": "{#label} should be a string.",
  "string.empty": "{#label} should not be empty.",
  "string.email": "Invalid email format.",
  "string.min": "{#label} should have a minimum length of {#limit}.",
  "string.max": "{#label} should have a maximum length of {#limit}.",
  "any.required": "{#label} is required.",
};

const SignUpSchema = joi.object({
  fullName: joi.string().min(5).max(80).required(),
  email: joi.string().email().required(),
  password: joi.string().required("").max(20),
  gender: joi.string().valid("male", "female", "others").required(),
  address: joi
    .object({
      city: joi.string().required(),
      state: joi.string().required(),
    })
    .required(),
  cars: joi
    .array()
    .items(
      joi.object({
        color: joi.string().required(),
        type: joi.string().required(),
        registration: joi.date().iso().required(),
        capacity: joi.number().integer().required(),
      })
    )
    .required(),
});
const LoginSchema = joi.object({
  email: joi.string().email().required().messages(customMessages),
  password: joi.string().required().messages(customMessages),
});

router.post(
  "/signUp",
  validation.body(SignUpSchema),
  userController.userSignup
);
router.post("/login", validation.body(LoginSchema), userController.userLogin);
// router.post("/logIn", userController.userLogin,userValidation.sanitizeLogin);

module.exports = router;
