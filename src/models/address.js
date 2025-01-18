const mongoose = require("mongoose");

const indianPhoneNumberRegex = /^[6-9]\d{9}$/;

const addressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return indianPhoneNumberRegex.test(v); 
        },
        message: "Invalid phone number format",
      },
    },
    alternativeMobileNumber: {
      type: String,
      validate: {
        validator: function (v) {
          return !v || indianPhoneNumberRegex.test(v);
        },
        message: "Invalid alternative mobile number format",
      },
    },
    address: {
      type: String,
      required: true,
      trim: true, // Street or full address
    },
    city: {
      type: String,
      required: true,
      trim: true, // City/district/town
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    landmark: {
      type: String,
      trim: true, // Optional landmark (e.g., near a famous building or location)
    },
    pincode: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^\d{5,6}$/.test(v); // Validates pincode with 5 or 6 digits
        },
        message: "Invalid pincode format",
      },
    }
  },
  { timestamps: true }
);

// Creating the model for the address schema
const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
