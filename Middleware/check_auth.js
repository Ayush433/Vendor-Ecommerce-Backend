const jwt = require("jsonwebtoken");
// const httpStatus = require("http-status");
// const useragent = require("useragent");
// const loginlog = require("../Controller/user/loginlogs/loginlogSchema");
// const otherHelper = require("../helper/other.helper");
// const isEmpty = require("../Middleware/validation/isEmpty");
// const { getSetting } = require("../helper/seeting.helper");
// const User = require("../Models/userModel");
// const userConfig = require("../Controller/user/userConfig");

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new Error("Authorization header missing");
    }
    const decodedToken = jwt.verify(token.split(" ")[1], "tokenGenerate");
    console.log(decodedToken);
    req.user = {
      id: decodedToken.id,
    };
    next();
  } catch (err) {
    console.log("err:", err);
    return res.status(401).json({
      status: 401,
      message: "Unauthorized",
    });
  }
};

module.exports = auth;

// authMiddleware.authentication = async (req, res, next) => {
//   try {
//     const secretOrKey = await getSetting("auth", "token", "secret_key");
//     let token =
//       req.body.token ||
//       req.query.token ||
//       req.headers["x-access-token"] ||
//       req.headers.authorization ||
//       req.headers.token;
//     if (token && token.length) {
//       token = token.replace("Bearer ", "");
//       const d = await jwt.verify(token, secretOrKey);
//       let passed = await loginlog
//         .findOne({ user_id: d.id, token, expires_in: { $gte: Date.now() } })
//         .populate([{ path: "user_id", select: "" }]);
//       if (passed && passed.user_id) {
//         req.user = JSON.parse(
//           JSON.stringify({
//             id: passed.user_id._id,
//             _id: passed.user_id._id,
//             name: passed.user_id.name,
//             email: passed.user_id.email,
//             role: passed.user_id.role,
//             gender: passed.user_id.gender,
//           })
//         );
//         req.is_guest = false;
//         return next();
//       } else {
//         return otherHelper.sendResponse(
//           res,
//           httpStatus.FORBIDDEN,
//           false,
//           null,
//           token,
//           "session not found",
//           null
//         );
//       }
//     }
//     return otherHelper.sendResponse(
//       res,
//       httpStatus.FORBIDDEN,
//       false,
//       null,
//       null,
//       "token Expired",
//       null
//     );
//   } catch (error) {
//     return otherHelper.sendResponse(
//       res,
//       httpStatus.FORBIDDEN,
//       false,
//       null,
//       null,
//       "token Expired",
//       null
//     );
//   }
// };

// authMiddleware.authentications = async (req, res, next) => {
//   try {
//     const user = await User.findOne(req.userId);
//     if (!user) {
//       return otherHelper.sendResponse(
//         res,
//         httpStatus.NOT_FOUND,
//         false,
//         userConfig.notfound
//       );
//     }
//     next();
//   } catch (error) {
//     return otherHelper.sendResponse(res, otherHelper.FORBIDDEN, false);
//   }
// };

// authMiddleware.byPassAuthentication_main = async (req, res, next) => {
//   try {
//     const secretOrKey = await getSetting("auth", "token", "secret_key");
//     let token =
//       req.body.token ||
//       req.query.token ||
//       req.headers["x-access-token"] ||
//       req.headers.authorization ||
//       req.headers.token;
//     if (token && token.length & (token != "undefine") && token != "null") {
//       token = token.replace("Bearer", "");
//       const d = await jwt.verify(token, secretOrKey);
//       let passed = await loginlog
//         .findOne({ user_id: d.id, token, expire_in: { $gte: Date.now() } })
//         .populate([{ path: "user_id", select: "" }]);
//       if (passed && passed.user_id) {
//         req.user = {
//           id: passed.user_id._id,
//           _id: passed.user_id._id,
//           name: passed.user_id.name,
//           email: passed.user_id.email,
//           role: passed.user_id.role,
//           gender: passed.user_id.gender,
//         };
//         req.is_guest = false;
//         return next();
//       } else {
//         return otherHelper.sendResponse(
//           res,
//           httpStatus.FORBIDDEN,
//           false,
//           null,
//           null,
//           "Session Expired",
//           null
//         );
//       }
//     } else {
//       req.is_guest = true;
//       return next();
//     }
//   } catch (error) {
//     return otherHelper.sendResponse(
//       res,
//       httpStatus.UNAUTHORIZED,
//       false,
//       null,
//       null,
//       "Login Expire Please Retry after Login",
//       null
//     );
//   }
// };

// authMiddleware.authorizationByPass = async (req, res, next) => {
//   try {
//     const secretOrKey = await getSetting("auth", "token", "secret_key");
//     let token =
//       req.body.token ||
//       req.query.token ||
//       req.headers["x-access-token"] ||
//       req.headers.authorization ||
//       req.headers.token;
//     if (token && token.length) {
//       token = token.replace("Bearer ", "");
//       const d = await jwt.verify(token, secretOrKey);
//       let passed = await loginlog.findOne({ token, is_active: true });
//       if (passed) {
//         req.user = d;
//         req.is_guest = false;
//         return next();
//       } else {
//         req.is_guest = true;
//         return next();
//       }
//     }
//     req.is_guest = true;
//     return next();
//   } catch (error) {
//     req.is_guest = true;
//     return next(error);
//   }
// };
