const httpStatus = require("http-status");
const isEmpty = require("../Middleware/validation/isEmpty");
const otherHelper = require("../helper/other.helper");
const validationHelper = require("../helper/validate.helper");
const validation = {};

validation.sanitizeRegister = (req, res, next) => {
  const sanitizeArray = [
    {
      field: "name",
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
  ];
  sanitizeHelper.sanitize(req, sanitizeArray);
  next();
};
validation.validateLoginInput = (req, res, next) => {
  const data = req.body;
  const validateArray = [
    {
      field: "email",
      validate: [
        {
          condition: "IsEmpty",
          msg: config.validate.empty,
        },
        {
          condition: "IsEmail",
          msg: config.validate.isEmail,
        },
      ],
    },
    {
      field: "password",
      validate: [
        {
          condition: "IsEmpty",
          msg: config.validate.empty,
        },
        {
          condition: "IsLength",
          msg: config.validate.passLength,
          option: { min: 6, max: 30 },
        },
      ],
    },
  ];
  const errors = validationHelper.validation(data, validateArray);
};
