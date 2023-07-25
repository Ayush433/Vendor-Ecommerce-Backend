const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const settingSchema = new Schema({
  key: {
    type: string,
  },
  type: {
    type: string,
    required: true,
  },
  sub_type: {
    type: string,
    require: true,
  },
  description: {
    type: string,
  },
  value: {
    type: Schema.Types.Mixed,
  },
});

module.exports = mongoose.model("Setting", settingSchema);
