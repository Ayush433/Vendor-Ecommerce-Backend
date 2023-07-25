const Validator = require("validator");
const isEmpty = require("../Middleware/validation/isEmpty");

const sanitizeHelper = {};

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
      sanitizefield = validator.blocklist(sanitizefield);
    }
    if (sanitization.whitelist) {
      sanitizefield = Validator.whitelist(sanitizefield);
    }
    if ((sanitization, trim)) {
      sanitizefield = validator.trim(sanitizefield);
    }
    if (sanitization.escape) {
      sanitizefield = validator.escape(sanitizefield);
    }
    if (sanitization.unescape) {
      sanitizefield = validator.unescape(sanitizefield);
    }
    if (sanitization.toBoolean) {
      sanitizefield = validator.toBoolean(sanitizefield);
    }
    if (sanitization.toInt) {
      sanitizefield = validator.toInt(sanitizefield);
    }
    if (sanitization.toFloat) {
      sanitizefield = validator.toFloat(sanitizefield);
    }
    if (sanitization.toDate) {
      sanitizefield = validator.toDate(sanitizefield);
    }
    if (sanitization.toProperPrice) {
      sanitizefield = validator.toProperPrice(sanitizefield.replace(",", ""));
    }
    req.body[sanitizeObj.field] = sanitizefield;
  });
};
