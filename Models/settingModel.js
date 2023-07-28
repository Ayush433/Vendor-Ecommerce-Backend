const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const settingSchema = new Schema({
  key: {
    type: String,
  },
  type: {
    type: String,
    required: true,
  },
  sub_type: {
    type: String,
    require: true,
  },
  description: {
    type: String,
  },
  value: {
    type: Schema.Types.Mixed,
  },
});

module.exports = mongoose.model("Setting", settingSchema);
