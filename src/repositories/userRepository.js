const User = require("../models/user");
const Cart = require("../models/cart");

const findById = async (userId) => {
  try {
    return await User.findById(userId);
  } catch (error) {
    throw new Error(`Error finding user by ID: ${error.message}`);
  }
};

const findByPhoneNumber = async (phoneNumber) => {
  try {
    return await User.findOne({ phoneNumber });
  } catch (error) {
    throw new Error(`Error finding user by phone number: ${error.message}`);
  }
};

const create = async ({ name, phoneNumber, role }) => {
  try {
    const user = new User({ name, phoneNumber, role });
    await user.save();

    // Create an empty cart for non-admin users
    if (role !== "admin") {
      const cart = new Cart({ userId: user._id, items: [] });
      await cart.save();
    }

    return user;
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

const updatePhoneNumber = async (userId, newPhoneNumber) => {
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { phoneNumber: newPhoneNumber },
      { new: true }
    );
    console.log("repo", user);
    return user;
  } catch (error) {
    throw new Error(`Error updating phone number: ${error.message}`);
  }
};

module.exports = { findByPhoneNumber, create, updatePhoneNumber, findById };
