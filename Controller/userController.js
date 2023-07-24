const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../Models/userModel");
const sendMail = require("../Utils/sendMail");

module.exports.userSignup = async (req, res) => {
  const { fullName, password, email, role } = req.body;
  console.log(req.body);

  try {
    const isExistUser = await User.findOne({ email });

    if (isExistUser) {
      return res
        .status(400)
        .json({ status: 400, message: "User Already Exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    const verificationToken = jwt.sign({ email }, "tokenGenerate", {
      expiresIn: "1h",
    });

    await User.create({
      fullName,
      email,
      password: hashedPassword,
      verificationToken,
      role,
    });

    const verificationLink = `http://localhost:5173/verify/${verificationToken}`;
    console.log(verificationLink);

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
  const { password, email } = req.body;

  try {
    const isExistUser = await User.findOne({ email: email });
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
        return res
          .status(400)
          .json({ message: "Password Incorrect Please Check Your Password " });
      }
    }
    return res
      .status(401)
      .json({ message: "User Not Found Please Login as soon as Possible " });
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports.UserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(401).json({
        message: "User Not Found",
        status: 401,
      });
    }
    const UserProfile = {
      user,
    };
    res.status(200).json(UserProfile);
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
    const user = await User.find(req.params.id);
    if (!user) {
      return res.status(400).json({
        status: 400,
        message: "User Not Found",
      });
    }
    const UserProfile = {
      fullName: user.fullName,
      email: user.email,
    };
    return res.status(200).json(UserProfile);
  } catch (error) {
    return res.status(400).json({
      status: 401,
      message: { error },
    });
  }
};

module.exports.editUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    console.log(user);
    return res.status(200).json({
      status: 200,
      user,
    });
  } catch (error) {
    return res.status(401).json({
      status: 401,
      message: { error },
    });
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    console.log(user);
    return res.status(200).json({
      status: 200,
      message: "User Deleted Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      status: 401,
      message: { error },
    });
  }
};
