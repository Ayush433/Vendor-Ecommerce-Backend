const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../Models/userModel");

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
    return res
      .status(201)
      .json({ status: 201, message: "User Successfully Registered " });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Incorrect" });
  }
};
