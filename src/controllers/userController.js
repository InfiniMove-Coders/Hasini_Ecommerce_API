const userService = require("../services/userService");

const signup = async (req, res) => {
  try {
    const user = await userService.signup(req.body);
    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const token = await userService.login(req.body);
    res.status(200).json({
      message: "Login successful",
      userToken: token,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updatePhoneNumber = async (req, res) => {
  try {
    const updatedUser = await userService.updatePhoneNumber(
      req.user._id,
      req.body.phoneNumber
    );
    res.status(200).json({
      message: "Phone number updated successfully",
      updatedUser,
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

module.exports = { signup, login, updatePhoneNumber };
