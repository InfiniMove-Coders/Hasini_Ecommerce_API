const Cart = require("../models/cart");

class CartRepository {
  getCartByUserId = async (userId) => {
    try {
      let cart = await Cart.findOne({ userId }).populate("items.productId");
      if (!cart) {
        cart = await Cart.create({ userId, items: [] });
        await newCart.save();
      }
      return cart;
    } catch (error) {
      throw new Error("Failed to retrieve cart");
    }
  };

  addItemToCart = async (userId, productId, quantity) => {
    try {
      const cart = await Cart.findOne({ userId });

      if (cart) {
        const itemIndex = cart.items.findIndex(
          (item) => item.productId == productId
        );

        if (itemIndex > -1) {
          cart.items[itemIndex].quantity += quantity;
          console.log(cart.items[itemIndex]);
        } else {
          cart.items.push({ productId, quantity });
        }

        await cart.save();
      } else {
        await (
          await Cart.create({ userId, items: [{ productId, quantity }] })
        ).save();
      }
      return cart;
    } catch (error) {
      throw new Error("Failed to add item to cart");
    }
  };

  removeItemFromCart = async (userId, productId) => {
    try {
      const cart = await Cart.findOne({ userId });

      if (cart) {
        cart.items = cart.items.filter((item) => item.productId != productId);
        await cart.save();
      }
    } catch (error) {
      throw new Error("Failed to remove item from cart");
    }
  };

  updateItemQuantity = async (userId, productId, quantity) => {
    try {
      const cart = await Cart.findOne({ userId });

      if (cart) {
        const item = cart.items.find((item) => item.productId == productId);

        if (item) {
          item.quantity = quantity;
          await cart.save();
        }
      }
      return cart;
    } catch (error) {
      throw new Error("Failed to update item quantity in cart");
    }
  };

  clearCart = async (userId) => {
    try {
      const cart = await Cart.findOne({ userId });

      if (cart) {
        cart.items = [];
        await cart.save();
      }
    } catch (error) {
      throw new Error("Failed to clear cart");
    }
  };
}

module.exports = CartRepository;
