const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const registrationSchema = new Schema({
  color: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  registration: {
    type: Date,
    required: true,
    default: Date.now,
  },
  capacity: {
    type: Number,
    required: true,
  },
});

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "others"],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },

  cars: [registrationSchema],

  avatar: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("User", userSchema);
