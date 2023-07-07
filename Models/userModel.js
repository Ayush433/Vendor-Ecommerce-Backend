const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  //   phoneNumber: {
  //     type: Number,
  //   },
  //   address: [
  //     {
  //       country: {
  //         type: String,
  //       },
  //       city: {
  //         type: String,
  //       },
  //       address1: {
  //         type: String,
  //       },
  //       address2: {
  //         type: String,
  //       },
  //       zipCode: {
  //         type: Number,
  //       },
  //       addressType: {
  //         type: String,
  //       },
  //     },
  //   ],
  role: {
    type: String,
    default: "user",
  },
  avatar: {
    public_id: {
      type: String,
      //   required: true,
    },
    url: {
      type: String,
      //   required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  //   resetPasswordToken: String,
  //   resetPasswordTime: Date,
});

module.exports = mongoose.model("User", userSchema);
