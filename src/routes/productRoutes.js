const express = require("express");
const ProductController = require("../controllers/productController");

const upload = require("../middlewares/multer");


const router = express.Router();

router.post("/", upload.single("image"), ProductController.createProduct);
router.get("/:id", ProductController.getProductById);
router.get("/", ProductController.getAllProducts);
router.get("/category/:category", ProductController.getProductsByCategory);
router.get("/all/active", ProductController.getActiveProducts);
router.patch("/:id", ProductController.updateProductById);
router.delete("/:id", ProductController.deleteProductById);

module.exports = router;
