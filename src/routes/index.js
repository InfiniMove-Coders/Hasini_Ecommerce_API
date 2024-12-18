const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
const productRoutes = require("./productRoutes");
const categoryRoutes = require("./categoryRoutes");
const orderRoutes = require("./orderRoutes");
const timeSlotRoutes = require("./timeslotRoutes");

router.use("/user", userRoutes);
router.use("/products", productRoutes);
router.use("/category", categoryRoutes);
router.use("/order", orderRoutes);
router.use("/timeslot", timeSlotRoutes);

module.exports = router;
