const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../Models/userModel");
// const sendMail = require("../../Utils/sendMail");
const otherHelper = require("../../helper/other.helper");
const httpStatus = require("http-status");
const userConfig = require("./userConfig");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

module.exports.userSignup = async (req, res) => {
  try {
    const { fullName, password, email, role, gender, address, cars } = req.body;

    if (!req.files || req.files.length === 0) {
      return otherHelper.sendResponse(
        res,
        httpStatus.BAD_REQUEST,
        false,
        userConfig.image
      );
    }

    const isExistUser = await User.findOne({ email });

    if (isExistUser) {
      const data = {
        email,
        fullName,
        role,
        gender,
        cars,
        address,
      };
      return otherHelper.sendResponse(
        res,
        httpStatus.CONFLICT,
        false,
        data,
        userConfig.validationMessage.emailExists,
        null
      );
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const verificationToken = jwt.sign({ email }, "tokenGenerate", {
      expiresIn: "1h",
    });

    const images = req.files.map((file) => ({
      public_id: file?.filename,
      url: file?.path,
    }));

    console.log("images", images);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      verificationToken,
      role,
      cars,
      gender,
      address,
      image: images,
    });

    return otherHelper.sendResponse(
      res,
      httpStatus.OK,
      true,
      user,
      userConfig.registerUser
    );
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Incorrect" });
  }
};

module.exports.userLogin = async (req, res) => {
  try {
    const { password, email } = req.body;
    const isExistUser = await User.findOne({ email });
    if (!isExistUser) {
      return otherHelper.sendResponse(
        res,
        httpStatus.NOT_FOUND,
        false,
        null,
        userConfig.validationMessage.emailRequired,
        null
      );
    }
    if (isExistUser) {
      const isValidPassword = await bcrypt.compareSync(
        password,
        isExistUser.password
      );
      if (isValidPassword) {
        const token = jwt.sign(
          { id: isExistUser._id, role: isExistUser.role },
          "tokenGenerate"
        );
        return res.status(200).json({
          status: 200,
          data: {
            id: isExistUser._id,
            fullName: isExistUser.fullName,
            email: isExistUser.email,
            role: isExistUser.role,
            token,
          },
        });
      } else {
        return otherHelper.sendResponse(
          res,
          httpStatus.BAD_REQUEST,
          false,
          null,
          userConfig.validationMessage.passwordMismatch,
          null
        );
      }
    }
    return otherHelper.sendResponse(
      res,
      httpStatus.BAD_REQUEST,
      false,
      null,
      userConfig.validationMessage.Email
    );
  } catch (err) {
    return otherHelper.sendResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      false,
      userConfig.server
    );
  }
};

module.exports.UserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return otherHelper.sendResponse(
        res,
        httpStatus.NOT_FOUND,
        false,
        userConfig.notfound
      );
    }
    const UserProfile = {
      user,
    };
    // res.status(200).json(UserProfile);
    return otherHelper.sendResponse(
      res,
      httpStatus.OK,
      userConfig.get,
      true,
      UserProfile
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: { error },
    });
  }
};

module.exports.singleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return otherHelper.sendResponse(
        res,
        httpStatus.NOT_FOUND,
        false,
        null,
        userConfig.notfound
      );
    }
    const UserProfile = {
      fullName: user.fullName,
      email: user.email,
      address: user.address,
      role: user.role,
      cars: user.cars,
      gender: user.gender,
    };
    return otherHelper.sendResponse(
      res,
      httpStatus.OK,
      true,
      null,
      UserProfile
    );
  } catch (error) {
    return otherHelper.sendResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      false,
      null
    );
  }
};

module.exports.editUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    console.log("user", user);
    return otherHelper.sendResponse(
      res,
      httpStatus.OK,
      true,
      null,
      userConfig.save
    );
  } catch (error) {
    return otherHelper.sendResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      false,
      null
    );
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user) {
      return otherHelper.sendResponse(
        res,
        httpStatus.OK,
        true,
        null,
        userConfig.delete
      );
    } else {
      return otherHelper.sendResponse(
        res,
        httpStatus.NOT_FOUND,
        false,
        userConfig.notfound
      );
    }
  } catch (error) {
    return otherHelper.sendResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      false,
      null
    );
  }
};

module.exports.allUser = async (req, res) => {
  try {
    const user = await User.find();
    console.log(user);
    return otherHelper.sendResponse(res, httpStatus.OK, true, user);
  } catch (error) {
    return otherHelper.sendResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      false,
      userConfig.server
    );
  }
};

module.exports.changePassword = async (req, res) => {
  try {
    const id = req.params.id;

    const body = req.body;

    const user = await User.findOne({ _id: id });

    const ValidPassword = await user.comparePassword(body.oldPassword);

    if (!ValidPassword) {
      return otherHelper.sendResponse(
        res,
        httpStatus.FORBIDDEN,
        false,
        userConfig.validationMessage.passwordMismatch
      );
    }
    user.password = await bcrypt.hash(body.newPassword, 8);
    await user.save();
    return otherHelper.sendResponse(
      res,
      httpStatus.OK,
      true,
      userConfig.validationMessage.passwordChange
    );
  } catch (error) {
    console.log(error);
  }
};
