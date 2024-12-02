const userService = require("../services/userService");
const sendResponse = require("../utils/responseHandler");

const signup = async (req, res) => {
  try {
    const user = await userService.signup(req.body);
    sendResponse(res, 201, "User registered successfully", { user });
  } catch (err) {
    sendResponse(res, 400, null, null, err.message);
  }
};

const login = async (req, res) => {
  try {
    const token = await userService.login(req.body);
    sendResponse(res, 200, "Login successful", { userToken: token });
  } catch (err) {
    sendResponse(res, 400, null, null, err.message);
  }
};

const updatePhoneNumber = async (req, res) => {
  try {
    const updatedUser = await userService.updatePhoneNumber(
      req.user._id,
      req.body.phoneNumber
    );
    sendResponse(res, 200, "Phone number updated successfully", {
      updatedUser,
    });
  } catch (err) {
    sendResponse(res, 400, null, null, err.message);
  }
};

module.exports = { signup, login, updatePhoneNumber };
