const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

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
  role: {
    type: String,
    default: "user",
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
  // address: {
  //   city: {
  //     type: String,
  //     required: true,
  //   },
  //   state: {
  //     type: String,
  //     required: true,
  //   },
  // },
  // cars: [registrationSchema],
  image: {
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

userSchema.methods.comparePassword = async function (enteredPassword) {
  try {
    return await bcrypt.compare(enteredPassword, this.password);
  } catch (error) {
    throw error;
  }
};
userSchema.methods.changePassword = async function (newPassword) {
  try {
    this.password = await bcrypt.hash(newPassword, 8);
    await this.save();
  } catch (error) {
    throw error;
  }
};
module.exports = mongoose.model("User", userSchema);
