const CartRepository = require("../repositories/cartRepository");
const cardRepository = new CartRepository();

class CartService {
  async getCartByUserId(userId) {
    try {
      return await cardRepository.getCartByUserId(userId);
    } catch (error) {
      throw new Error(`Get cart failed: ${error.message}`);
    }
  }

  async addItemToCart(userId, productId, quantity) {
    try {
      return await cardRepository.addItemToCart(userId, productId, quantity);
    } catch (error) {
      throw new Error(`Add item to cart failed: ${error.message}`);
    }
  }

  async removeItemFromCart(userId, productId) {
    try {
      return await cardRepository.removeItemFromCart(userId, productId);
    } catch (error) {
      throw new Error(`Remove item from cart failed: ${error.message}`);
    }
  }

  async updateItemQuantity(userId, productId, quantity) {
    try {
      return await cardRepository.updateItemQuantity(
        userId,
        productId,
        quantity
      );
    } catch (error) {
      throw new Error(`Update item quantity failed: ${error.message}`);
    }
  }

  async clearCart(userId) {
    try {
      return await cardRepository.clearCart(userId);
    } catch (error) {
      throw new Error(`Clear cart failed: ${error.message}`);
    }
  }
}

module.exports = CartService;
