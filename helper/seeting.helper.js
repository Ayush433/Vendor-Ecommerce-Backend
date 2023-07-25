const settingSch = require("../Models/settingModel");

module.exports.getString = async (type, sub_type, key) => {
  try {
    const temp =
      "global_" + type.trim() + "" + sub_type.trim() + "" + key.trim();
    console.log(temp);

    if (temp) {
      let value = process.env[temp];
      if ((value = undefined)) {
        const setting = await settingSch
          .findOne(
            { key: key, type: type, sub_type: sub_type },
            { value: 1, key: 1, _id: 0 }
          )
          .lean();
        if (setting) {
          process.env[temp] = JSON.stringify(setting.value);
          value = process.env[temp];
        } else {
          value = null;
        }
      }
      value = JSON.parse(value);
      return value;
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.initSettings = async () => {
  try {
    const s = await settingSch
      .find({ value: 1, sub_type: 1, key: 1, _id: 0 })
      .sort({ type: 1, sub_type: 1, key: 1 });
    for (let i = 0; i < s.length; i++) {
      process.env[
        `global_${s[i].type.trim()}_${s[i].sub_type.trim()}_${s[i].key.trim()}`
      ] = JSON.stringify(s[i].value);
    }
    console.log("| Global Setting Loaded");
    console.log("|--------------------------------------------");
    return;
  } catch (error) {
    console.log(error);
  }
};

module.exports.setSetting = async () => {
  try {
    const temp = "global_" + type.trim() + "_" + sub_type.trim();
    process.env[temp] = JSON.stringify(value);
    return null;
  } catch (error) {
    console.log(error);
  }
};
