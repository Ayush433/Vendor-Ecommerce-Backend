const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../Models/userModel");
const sendMail = require("../Utils/sendMail");

module.exports.userSignup = async (req, res) => {
  const { fullName, password, email } = req.body;
  console.log(req.body);

  try {
    const isExistUser = await User.findOne({ email });

    if (isExistUser) {
      return res
        .status(400)
        .json({ status: 400, message: "User Already Exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 8);

    await User.create({
      fullName,
      email,
      password: hashedPassword,
      // avatar: req.file.filename,
    });
    await sendMail({
      email: email,
      subject: "Registration Successful",
      text: "Thank you for registering with us.",
    });

    return res
      .status(201)
      .json({ status: 201, message: "User Successfully Registered " });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Incorrect" });
  }
};
