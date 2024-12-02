const express = require("express");
const router = express.Router();

const {authenticate,isAdmin}=require("../middlewares/authenticate");

const userController = require("../controllers/userController");

router.post("/signup", userController.signup);
router.get("/login", userController.login);
router.put("/updatePhoneNumber/", authenticate,userController.updatePhoneNumber);

module.exports = router;
