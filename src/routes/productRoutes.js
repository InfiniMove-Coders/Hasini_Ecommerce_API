const express = require("express");
const ProductController = require("../controllers/productController");
const upload = require("../middlewares/multer");

const router = express.Router();

router.post("/", upload.single("image"), ProductController.createProduct);
router.get("/:id", ProductController.getProductById);
router.get("/", ProductController.getAllProducts);
router.patch("/:id", ProductController.updateProductById);
router.delete("/:id", ProductController.deleteProductById);

module.exports = router;
