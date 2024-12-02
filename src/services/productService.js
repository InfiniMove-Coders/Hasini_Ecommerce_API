const cloudinary = require("../config/cloudinary-config");
const ProductRepository = require("../repositories/productRepository");

class ProductService {
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async createProduct(data, fileBuffer) {
    try {
      const cloudinaryResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "ecommerce_products" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );

        uploadStream.end(fileBuffer);
      });

      data.imageUrl = cloudinaryResult.secure_url;

      return await this.productRepository.create(data);
    } catch (error) {
      throw new Error(`Error while creating product: ${error.message}`);
    }
  }

  async getProductById(id) {
    try {
      const product = await this.productRepository.findById(id);
      if (!product) throw new Error("Product not found");
      return product;
    } catch (error) {
      throw new Error(`Error while fetching product by ID: ${error.message}`);
    }
  }

  async getAllProducts(query) {
    try {
      return await this.productRepository.findAll(query);
    } catch (error) {
      throw new Error(`Error while fetching all products: ${error.message}`);
    }
  }

  async getProductsByCategory(category, options) {
    try {
      return await this.productRepository.findByCategory(category, options);
    } catch (error) {
      throw new Error(
        `Error while fetching products by category: ${error.message}`
      );
    }
  }

  async updateProductStock(productId, stock) {
    try {
      const product = await this.productRepository.updateStock(
        productId,
        stock
      );
      if (!product) throw new Error("Product not found");
      return product;
    } catch (error) {
      throw new Error(`Error while updating product stock: ${error.message}`);
    }
  }

  async getActiveProducts(options) {
    try {
      return await this.productRepository.findActiveProducts(options);
    } catch (error) {
      throw new Error(`Error while fetching active products: ${error.message}`);
    }
  }

  async updateProductById(id, updateData) {
    try {
      const updatedProduct = await this.productRepository.updateById(
        id,
        updateData
      );
      if (!updatedProduct) throw new Error("Product not found");
      return updatedProduct;
    } catch (error) {
      throw new Error(`Error while updating product: ${error.message}`);
    }
  }

  async deleteProductById(id) {
    try {
      const deletedProduct = await this.productRepository.deleteById(id);
      if (!deletedProduct) throw new Error("Product not found");
    } catch (error) {
      throw new Error(`Error while deleting product: ${error.message}`);
    }
  }
}

module.exports = ProductService;
