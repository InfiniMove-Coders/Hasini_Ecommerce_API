const  mongoose = require("mongoose");
const ProductService = require("../services/productService");

class ProductController {
  constructor() {
    this.productService = new ProductService();
  }

  createProduct = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      const product = await this.productService.createProduct(
        req.body,
        req.file.buffer
      );
      res.status(201).json({
        message: "Product created successfully",
        product,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  getProductById = async (req, res) => {
    try {
      const product = await this.productService.getProductById(req.params.id);
      if (!product)
        return res.status(404).json({ message: "Product not found" });
      res.status(200).json({
        message: "Product retrieved successfully",
        product,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  getAllProducts = async (req, res) => {
    try {
      const filters = req.query;
      if (filters.category){
        filters.category = new mongoose.Types.ObjectId(filters.category);
      }
      const products = await this.productService.getAllProducts(filters);
      res.status(200).json({
        message: "Products retrieved successfully",
        products,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  getProductsByCategory = async (req, res) => {
    try {
      const products = await this.productService.getProductsByCategory(
        req.params.category,
        req.query
      );
      res.status(200).json({
        message: "Products retrieved successfully",
        products,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  getActiveProducts = async (req, res) => {
    try {
      const products = await this.productService.getActiveProducts(req.query);
      res.status(200).json({
        message: "Active products retrieved successfully",
        products,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  updateProductById = async (req, res) => {
    try {
      const product = await this.productService.updateProductById(
        req.params.id,
        req.body
      );
      res.status(200).json({
        message: "Product updated successfully",
        product,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  deleteProductById = async (req, res) => {
    try {
      await this.productService.deleteProductById(req.params.id);
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

}

module.exports = new ProductController();
