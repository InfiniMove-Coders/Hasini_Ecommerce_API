const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
const productRoutes = require("./productRoutes");
const categoryRoutes = require("./categoryRoutes");
const orderRoutes = require("./orderRoutes");
const timeSlotRoutes = require("./timeslotRoutes");
const addressRoutes = require("./addressRoutes");
const cartRoutes = require("./cartRoutes");

router.use("/user", userRoutes);
router.use("/products", productRoutes);
router.use("/category", categoryRoutes);
router.use("/timeslot", timeSlotRoutes);
router.use("/orders", orderRoutes);
router.use("/address", addressRoutes);
router.use("/cart", cartRoutes);

module.exports = router;
