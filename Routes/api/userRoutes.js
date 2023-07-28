const express = require("express");
const joi = require("joi");
const router = express.Router();
const auth = require("../../Middleware/check_auth");
const userController = require("../../Controller/user/userController");
const validation = require("express-joi-validation").createValidator({});
const userValidation = require("../../Controller/user/userValidation");

const SignUpSchema = joi.object({
  fullName: joi.string().min(5).max(80).required(),
  email: joi.string().email().required(),
  password: joi.string().required("").max(20),
  gender: joi.string().valid("male", "female", "others").required(),
  role: joi.string().optional(),
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
  email: joi.string().email().required(),
  password: joi.string().required(),
});

router.post(
  "/signUp",
  validation.body(SignUpSchema),
  userController.userSignup
);
router.post("/login", validation.body(LoginSchema), userController.userLogin);

router.post(
  "/register",
  userValidation.sanitizeLogin,
  userController.userSignup
);

router.delete(
  "/delete/:id",
  auth.CheckAuth,
  auth.accessToUserAndAdmin,
  userController.deleteUser
);

router.patch(
  "/edit/:id",
  auth.CheckAuth,
  auth.accessToUserAndAdmin,
  userController.editUser
);

router.get("/single/user/:id", auth.CheckAuth, userController.singleUser);

router.get("/profile", auth.CheckAuth, userController.UserProfile);

router.get("/allUser", auth.CheckAuth, auth.isAdmin, userController.allUser);

router.patch(
  "/changePassword/:id",
  auth.CheckAuth,
  auth.isAdmin,
  userController.changePassword
);

module.exports = router;
