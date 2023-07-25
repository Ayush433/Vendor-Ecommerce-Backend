const JWTStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const mongoose = require("mongoose");
const User = require("../Models/userModel");
const {
  getSetting,
} = require("../../../WaftEngine/server/helper/settings.helper");

module.exports = async (passport) => {
  const secretorKey = await getSetting("auth", "token", "secret-key");
};
