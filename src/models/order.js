const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    deliveryAt: {
      type: Date,
      required: true,
    },
    deliveryTimeSlot: {
      type: String,
      required: true,
      match:
        /^([01]?[0-9]):[0-5][0-9] (AM|PM) - ([01]?[0-9]):[0-5][0-9] (AM|PM)$/,
    },
    shippingAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    // paymentMethod: {
    //   type: String,
    //   enum: ["Credit Card", "PayPal", "Cash on Delivery"],
    //   required: true,
    // },
    // paymentStatus: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
