const CategoryService = require("../services/categoryService");

const createCategory = async (req, res) => {
  try {
    const category = await CategoryService.createCategory(req.body);
    res.status(201).json({
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const category = await CategoryService.getCategoryById(req.params.id);
    res.status(200).json(category);
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryService.getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const updateCategoryById = async (req, res) => {
  try {
    const updatedCategory = await CategoryService.updateCategoryById(
      req.params.id,
      req.body
    );
    res.status(200).json({
      message: "Category updated successfully",
      updatedCategory,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const deleteCategoryById = async (req, res) => {
  try {
    const deletedCategory = await CategoryService.deleteCategoryById(
      req.params.id
    );
    res.status(200).json({
      message: "Category deleted successfully",
      deletedCategory,
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
};

const findCategoryBySlug = async (req, res) => {
  try {
    const category = await CategoryService.findCategoryBySlug(req.params.slug);
    res.status(200).json(category);
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
};

module.exports = {
  createCategory,
  getCategoryById,
  getAllCategories,
  updateCategoryById,
  deleteCategoryById,
  findCategoryBySlug,
};
