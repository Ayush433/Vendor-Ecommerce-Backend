const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserActivitySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, refs: "User" },
  timeStamps: {
    type: Date,
    require: true,
  },
  action: {
    type: String,
    require: true,
  },
  CreatedAt: {
    type: Date,
    default: Date.now(),
    require: true,
  },
});

module.exports = mongoose.model("Activity", UserActivitySchema);
