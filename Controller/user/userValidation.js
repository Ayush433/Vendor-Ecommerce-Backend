const httpStatus = require("http-status");
const isEmpty = require("../../Middleware/validation/isEmpty");
const otherHelper = require("../../helper/other.helper");
const config = require("./userConfig");
const validationHelper = require("../../helper/validate.helper");
const sanitizeHelper = require("../../helper/sanitize.helper");

const validation = {};

validation.sanitizeRegister = (req, res, next) => {
  const sanitizeArray = [
    {
      field: "fullName",
      sanitize: {
        trim: true,
      },
    },
    {
      field: "email",
      sanitize: {
        trim: true,
      },
    },
    {
      field: "password",
      sanitize: {
        trim: true,
      },
    },
    {
      field: "gender",
      sanitize: {
        trim: true,
      },
    },
    {
      field: "address",
      sanitize: {
        trim: true,
      },
    },
    {
      field: "cars",
      sanitize: {
        trim: true,
      },
    },
  ];
  sanitizeHelper.sanitize(req, sanitizeArray);
  next();
};
validation.sanitizeLogin = (req, res, next) => {
  const sanitizeArray = [
    {
      field: "email",
      sanitize: {
        trim: true,
      },
    },
  ];
  sanitizeHelper.sanitize(req, sanitizeArray);
};
module.exports = validation;
