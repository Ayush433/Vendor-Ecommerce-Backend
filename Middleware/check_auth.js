const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const userConfig = require("../Controller/user/userConfig");
const otherHelper = require("../helper/other.helper");

const CheckAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new Error("Authorization header missing");
    }
    const decodedToken = jwt.verify(token.split(" ")[1], "tokenGenerate");

    req.user = {
      id: decodedToken.id,
      role: decodedToken.role,
    };
    next();
  } catch (err) {
    return res.status(401).json({
      status: 401,
      message: "Unauthorized",
    });
  }
};

const isAdmin = (req, res, next) => {
  console.log("req.user", req.user.role);
  try {
    if (req.user.role === "admin") {
      next();
    } else {
      return otherHelper.sendResponse(
        res,
        httpStatus.UNAUTHORIZED,
        false,
        userConfig.notauthorized
      );
    }
  } catch (err) {
    return otherHelper.sendResponse(
      res,
      httpStatus.FORBIDDEN,
      false,
      userConfig.server
    );
  }
};

const accessToUserAndAdmin = (req, res, next) => {
  console.log("req.user", req.user);
  try {
    const { id, role } = req.user;
    const requestedUserId = req.params.id;

    if (role === "admin" || id === requestedUserId) {
      next();
    } else {
      return otherHelper.sendResponse(
        res,
        httpStatus.UNAUTHORIZED,
        false,
        userConfig.notauthorized
      );
    }
  } catch (error) {
    return otherHelper.sendResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      false,
      userConfig.server
    );
  }
};

module.exports = { isAdmin, CheckAuth, accessToUserAndAdmin };

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
