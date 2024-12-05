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
      enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    deliveryAt: {
      type: Date,
    },
    // shippingAddress: {
    //   fullName: {
    //     type: String,
    //     required: true,
    //   },
    //   address: {
    //     type: String,
    //     required: true,
    //   },
    //   city: {
    //     type: String,
    //     required: true,
    //   },
    //   postalCode: {
    //     type: String,
    //     required: true,
    //   },
    //   country: {
    //     type: String,
    //     required: true,
    //   },
    // },
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
