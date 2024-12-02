const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.post("/", categoryController.createCategory);
router.get("/:id", categoryController.getCategoryById);
router.get("/", categoryController.getAllCategories);
router.put("/:id", categoryController.updateCategoryById);
router.delete("/:id", categoryController.deleteCategoryById);
router.get("/slug/:slug", categoryController.findCategoryBySlug);

module.exports = router;
