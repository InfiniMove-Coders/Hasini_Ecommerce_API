const express = require("express");
const ProductController = require("../controllers/productController");
const upload = require("../middlewares/multer");
const { authenticate, isAdmin } = require("../middlewares/authenticate");

const router = express.Router();

router.post("/", upload.single("image"), ProductController.createProduct);
router.get("/:id", ProductController.getProductById);
router.get("/", ProductController.getAllProducts);
router.patch("/:id", ProductController.updateProductById);
router.delete("/:id", ProductController.deleteProductById);
router.post("/:id/rating", authenticate, ProductController.addNewRating);

module.exports = router;
