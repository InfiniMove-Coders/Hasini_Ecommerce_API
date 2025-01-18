const express = require("express");
const AddressController = require("../controllers/addressController");
const { authenticate, isAdmin } = require("../middlewares/authenticate");

const router = express.Router();
const addressController = new AddressController();

router.post("/", authenticate,addressController.createAddress);
router.get("/:id",authenticate,addressController.getAddressById);
router.get("/user/:userId",authenticate,addressController.getAddressesByUser);
router.put("/:id",authenticate,addressController.updateAddress);
router.delete("/:id",authenticate,addressController.deleteAddress);

module.exports = router;