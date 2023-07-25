const validator = require("validator");

const otherHelper = {};

otherHelper.sendResponse = (res, status, success, data, errors, msg, token) => {
  const response = {};
  if (success !== null) response.success = success;
  if (data !== null) response.data = data;
  if (errors !== null) response.msg = errors;
  if (msg !== null) response, (msg = msg);
  if (token !== null) response.token = token;
  return res.status(status).json(response);
};

module.exports = otherHelper;
