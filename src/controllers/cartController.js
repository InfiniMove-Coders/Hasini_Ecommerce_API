const cardService = require("../services/cartService");
const sendResponse = require("../utils/responseHandler");

class CartController {
  constructor() {
    this.cartService = new cardService();
  }

  getCartByUserId = async (req, res) => {
    try {
      console.log(req.user._id);
      const cart = await this.cartService.getCartByUserId(req.user._id);
      sendResponse(res, 200, "Cart retrieved successfully", { cart });
    } catch (error) {
      sendResponse(res, 400, null, null, error.message);
    }
  };

  addItemToCart = async (req, res) => {
    try {
      const { productId, quantity } = req.body;
      const cart = await this.cartService.addItemToCart(
        req.user._id,
        productId,
        parseInt(quantity)
      );
      sendResponse(res, 201, "Item added to cart successfully", { cart });
    } catch (error) {
      sendResponse(res, 400, null, null, error.message);
    }
  };

  removeItemFromCart = async (req, res) => {
    try {
      const { productId } = req.body;
      const cart = await this.cartService.removeItemFromCart(
        req.user._id,
        productId
      );
      sendResponse(res, 200, "Item removed from cart successfully", { cart });
    } catch (error) {
      sendResponse(res, 400, null, null, error.message);
    }
  };

  updateItemQuantity = async (req, res) => {
    try {
      const { productId, quantity } = req.body;
      const cart = await this.cartService.updateItemQuantity(
        req.user._id,
        productId,
        parseInt(quantity)
      );
      sendResponse(res, 200, "Item quantity updated successfully", { cart });
    } catch (error) {
      sendResponse(res, 400, null, null, error.message);
    }
  };

  clearCart = async (req, res) => {
    try {
      const cart = await this.cartService.clearCart(req.user._id);
      sendResponse(res, 200, "Cart cleared successfully", { cart });
    } catch (error) {
      sendResponse(res, 400, null, null, error.message);
    }
  };
}

module.exports = new CartController();
