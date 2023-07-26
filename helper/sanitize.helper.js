// sanitizeHelper.js
const Validator = require("validator");
const sanitizeHelper = require("../helper/sanitize.helper");
const isEmpty = require("../Middleware/validation/isEmpty");
// ...

sanitizeHelper.sanitize = (req, sanitizeArray) => {
  sanitizeArray.forEach((sanitizeObj) => {
    let sanitizefield = req.body[sanitizeObj.field];
    sanitizefield = !isEmpty(sanitizefield) ? sanitizefield + "" : "";
    const sanitization = sanitizeObj.sanitize;
    if (sanitization.rtrim) {
      sanitizefield = Validator.rtrim(sanitizefield);
    }
    if (sanitization.ltrim) {
      sanitizefield = Validator.ltrim(sanitizefield);
    }
    if (sanitization.blocklist) {
      sanitizefield = Validator.blocklist(sanitizefield); // Updated to Validator.blocklist
    }
    if (sanitization.whitelist) {
      sanitizefield = Validator.whitelist(sanitizefield);
    }
    if (sanitization.trim) {
      sanitizefield = Validator.trim(sanitizefield); // Updated to Validator.trim
    }
    if (sanitization.escape) {
      sanitizefield = Validator.escape(sanitizefield);
    }
    if (sanitization.unescape) {
      sanitizefield = Validator.unescape(sanitizefield);
    }
    if (sanitization.toBoolean) {
      sanitizefield = Validator.toBoolean(sanitizefield);
    }
    if (sanitization.toInt) {
      sanitizefield = Validator.toInt(sanitizefield);
    }
    if (sanitization.toFloat) {
      sanitizefield = Validator.toFloat(sanitizefield);
    }
    if (sanitization.toDate) {
      sanitizefield = Validator.toDate(sanitizefield);
    }
    if (sanitization.toProperPrice) {
      sanitizefield = Validator.toProperPrice(sanitizefield.replace(",", ""));
    }
    req.body[sanitizeObj.field] = sanitizefield;
  });
};
