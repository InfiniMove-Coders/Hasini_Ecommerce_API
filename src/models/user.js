const mongoose = require("mongoose");

const indianPhoneNumberRegex = /^[6-9]\d{9}$/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return indianPhoneNumberRegex.test(value);
      },
      message: (props) => `${props.value} is not a valid Indian phone number!`,
    },
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
