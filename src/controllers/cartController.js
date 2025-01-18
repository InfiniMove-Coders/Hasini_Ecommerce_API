const CartService = require("../services/cartService");
const sendResponse = require("../utils/responseHandler");

class CartController {
  constructor() {
    this.cartService = new CartService();
  }

  getCartByUser = async (req, res) => {
    try {
      const userId = req.user._id;
      const cart = await this.cartService.getCartByUser(userId);
      if (!cart) {
        return res.status(404).json({ message: "You Didn't added Items Yet" });
      }

      res.status(200).json({ data:cart });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch the cart" });
    }
  };

  addToCart = async (req, res) => {
    try {
      const cart = await this.cartService.addToCart(req.user._id, req.body);
      sendResponse(res, 200, "Product added to cart", { cart });
    } catch (error) {
      sendResponse(res, 400, null, null, error.message);
    }
  };

  removeFromCart = async (req, res) => {
    try {
      const cart = await this.cartService.removeFromCart(
        req.user._id,
        req.params.itemId
      );
      sendResponse(res, 200, "Product removed from cart", { cart });
    } catch (error) {
      sendResponse(res, 400, null, null, error.message);
    }
  };

  updateItemQuantity = async (req, res) => {
    try {
      const cart = await this.cartService.updateItemQuantity(
        req.user._id,
        req.params.itemId,
        req.body.quantity
      );
      sendResponse(res, 200, "Cart item quantity updated", { cart });
    } catch (error) {
      sendResponse(res, 400, null, null, error.message);
    }
  };

  clearCart = async (req, res) => {
    try {
      const cart = await this.cartService.clearCart(req.user._id);
      sendResponse(res, 200, "Cart cleared", { cart });
    } catch (error) {
      sendResponse(res, 400, null, null, error.message);
    }
  };

  validateCart = async (req, res) => {
    try {
      const cart = await this.cartService.validateCart(req.user._id);
      sendResponse(res, 200, "Cart validated", { cart });
    } catch (error) {
      sendResponse(res, 400, null, null, error.message);
    }
  };
}

module.exports = CartController;
