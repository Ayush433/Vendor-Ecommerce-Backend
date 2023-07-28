const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../Models/userModel");
const sendMail = require("../../Utils/sendMail");
const otherHelper = require("../../helper/other.helper");
const httpStatus = require("http-status");
const userConfig = require("./userConfig");

module.exports.userSignup = async (req, res) => {
  try {
    const { fullName, password, email, role, gender, address, cars } = req.body;
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

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      verificationToken,
      role,
      cars,
      gender,
      address,
    });
    const verificationLink = `http://localhost:5173/verify/${verificationToken}`;
    try {
      await sendMail({
        email,
        subject: "Email Verification",
        text: `Please click on the following link to verify your email: ${verificationLink}`,
      });
      return res.status(201).json({
        status: 201,
        message: `Please check your email (${email}) to activate your account.`,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Incorrect" });
  }
};

module.exports.userLogin = async (req, res) => {
  try {
    const { password, email } = req.body;
    let errors = {};
    const isExistUser = await User.findOne({ email });

    if (!isExistUser) {
      return otherHelper.sendResponse(
        res,
        httpStatus.NOT_FOUND,
        false,
        null,
        errors,
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
        const token = jwt.sign({ id: isExistUser._id }, "tokenGenerate");
        return res.status(200).json({
          status: 200,
          data: {
            id: isExistUser._id,
            fullName: isExistUser.fullName,
            email: isExistUser.email,
            token,
          },
        });
      } else {
        return otherHelper.sendResponse(
          res,
          httpStatus.BAD_REQUEST,
          false,
          null,
          errors,
          userConfig.validationMessage.passwordMismatch,
          null
        );
      }
    }
    // return res.status(401).json({ message: "User Not Found Please Login " });
    return otherHelper.sendResponse(
      res,
      httpStatus.BAD_REQUEST,
      false,
      null,
      userConfig.validationMessage.Email
    );
  } catch (err) {
    return res.status(400).json(err);
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
    console.log(user);
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
    console.log(user);
    return otherHelper.sendResponse(
      res,
      httpStatus.OK,
      true,
      null,
      userConfig.delete
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
