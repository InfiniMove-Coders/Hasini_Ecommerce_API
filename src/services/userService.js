const userRepository = require("../repositories/userRepository");
const jwt = require("jsonwebtoken");
//const bcrypt = require("bcryptjs");
const { JWT_SECRET_KEY } = require("../config/serverConfig");

const signup = async ({ name, phoneNumber,role }) => {
  try {
    const existingUser = await userRepository.findByPhoneNumber(phoneNumber);
    if (existingUser) {
      throw new Error("Phone number already exists!");
    }
    const user = await userRepository.create({ name, phoneNumber,role });
    return user;
  } catch (error) {
    throw new Error(`Signup failed: ${error.message}`);
  }
};

const login = async ({ phoneNumber }) => {
  try {
    const user = await userRepository.findByPhoneNumber(phoneNumber);
    if (!user) {
      throw new Error("User not found!");
    }
    const token = jwt.sign(
      {
        phoneNumber: user.phoneNumber,
        name: user.name,
        _id: user._id,
        role:user.role
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    return token;
  } catch (error) {
    throw new Error(`Login failed: ${error.message}`);
  }
};

const updatePhoneNumber = async (userId, newPhoneNumber) => {
  try {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new Error("User not found!");
    }

    if (user.phoneNumber === newPhoneNumber) {
      throw new Error("This is already your current phone number.");
    }

    const updatedUser = await userRepository.updatePhoneNumber(
      userId,
      newPhoneNumber
    );
    return updatedUser;
  } catch (error) {
    throw new Error(`Update phone number failed: ${error.message}`);
  }
};

module.exports = { signup, login, updatePhoneNumber };
