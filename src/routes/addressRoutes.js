const express = require("express");
const AddressController = require("../controllers/addressController");
const { authenticate, isAdmin } = require("../middlewares/authenticate");

const router = express.Router();
const addressController = new AddressController();

router.get("/", authenticate, isAdmin, addressController.getAllAddresses);
router.post("/", authenticate, addressController.createAddress);
router.get("/:id", authenticate, addressController.getAddressById);
router.get("/user/:id", authenticate, addressController.getAddressesByUser);
router.patch("/:id", authenticate, addressController.updateAddress);
router.delete("/:id", authenticate, isAdmin, addressController.deleteAddress);

module.exports = router;