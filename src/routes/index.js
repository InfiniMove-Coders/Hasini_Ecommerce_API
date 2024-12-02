const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes"); 
const productRoutes=require("./productRoutes");
const categoryRoutes=require("./categoryRoutes");

router.use("/user", userRoutes);
router.use("/products",productRoutes);
router.use("/category",categoryRoutes);


module.exports = router;
