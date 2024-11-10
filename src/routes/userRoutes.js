const express = require("express");
const router = express.Router();

const {authenticate,isAdmin}=require("../middlewares/authenticate");

const userController = require("../controllers/userController");

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.put("/updatePhoneNumber/", authenticate,isAdmin,userController.updatePhoneNumber);

module.exports = router;
