const CartRepository = require("../repositories/cartRepository");
const ProductRepository = require("../repositories/productRepository");

class CartService {
  constructor() {
    this.cartRepository = new CartRepository();
    this.productRepository = new ProductRepository();
  }

  async getCartByUser(userId) {
    try {
      const cart = await this.cartRepository.getCart(userId);
  
      if (!cart) {
        throw new Error("Cart not found");
      }
  
      const notifications = [];
      const updatedItems = [];
  
      for (const item of cart.items) {
        if (item.productId) {
          const product = item.productId;
  
          if (!product.isActive || product.stock === 0) {
            notifications.push(
              `The product "${product.name}" is no longer available and has been removed from your cart.`
            );
          } else if (item.quantity > product.stock) {
            notifications.push(
              `The quantity for "${product.name}" has been adjusted to the available stock (${product.stock}).`
            );
            updatedItems.push({ ...item, quantity: product.stock });
          } else {
            updatedItems.push(item);
          }
        } else {
          notifications.push("A product in your cart has been deleted by the admin and removed.");
        }
      }
      cart.items = updatedItems;
  
      if (notifications.length > 0) {
        await this.cartRepository.updateById(cart._id, cart);
      }
  
      const totalPrice = updatedItems.reduce((sum, item) => {
        return sum + item.quantity * item.productId.price;
      }, 0);
  
      const userMessage =
        notifications.length > 0
          ? notifications.join("#")
          : "Your cart is up-to-date.";
  
      return {
        ...cart,
        totalPrice,
        userMessage,
      };
    } catch (error) {
      console.error(`Error getting cart for user ${userId}:`, error);
      throw new Error("Failed to retrieve cart. Please try again.");
    }
  }
  
  async createCartForUser(userId) {
    try {
      const cartData = {
        userId:userId,
        items: [],
      };
      const cart = await this.cartRepository.create(cartData);
      return cart;
    } catch (error) {
      console.error("Error creating cart:", error);
      throw new Error("Failed to create a cart"); 
    }
  }

  async addToCart(userId, { productId, quantity }) {
    try {
      let cart = await this.cartRepository.getCart(userId);
      if (!cart) {
        cart = await this.createCartForUser(userId);
      }

      const product = await this.productRepository.findById(productId);
      if (!product) {
        throw new Error("Product not found");
      }
      if (product.stock < quantity) {
        throw new Error("Not enough stock available");
      }

      const itemIndex = cart.items.findIndex((item) => item.productId._id.toString() === productId);
      if (itemIndex === -1) {
        cart.items.push({ productId: productId, quantity});
      } else {
        cart.items[itemIndex].quantity = quantity;
      }
      return await this.cartRepository.updateById(cart._id, cart);
    } catch (error) {
      console.error(`Error adding product ${productId} to cart for user ${userId}:`, error);
      throw new Error("Failed to add item to cart. Please try again.");
    }
  }

  async removeFromCart(userId, productId) {
    try {
      const cart = await this.cartRepository.getCart(userId);
      if (!cart) {
        throw new Error("Cart not found");
      }
      cart.items = cart.items.filter((item) => item.productId._id.toString() !== productId);
      return await this.cartRepository.updateById(cart._id, cart);
    } catch (error) {
      console.error(`Error removing product ${productId} from cart for user ${userId}:`, error);
      throw new Error("Failed to remove item from cart. Please try again.");
    }
  }

  async updateItemQuantity(userId, productId, quantity) {
    try {
      const cart = await this.cartRepository.getCart(userId);
      if (!cart) {
        throw new Error("Cart not found");
      }
      const itemIndex = cart.items.findIndex((item) => item.productId._id.toString() === productId);
  
      const product = await this.productRepository.findById(productId);
      if (product.stock < quantity) {
        throw new Error("stock unavailable");
      }

      cart.items[itemIndex].quantity = quantity;
      return await this.cartRepository.updateById(cart._id, cart);
    } catch (error) {
      throw new Error("Failed to update item quantity. Please try again.");
    }
  }

  async clearCart(userId) {
    try {
      const cart = await this.cartRepository.getCart(userId);
      if (!cart) {
        throw new Error("Cart not found");
      }
      cart.items = [];
      return await this.cartRepository.updateById(cart._id, cart);
    } catch (error) {
      console.error(`Error clearing cart for user ${userId}:`, error);
      throw new Error("Failed to clear cart. Please try again.");
    }
  }

  async validateCart(userId) {
    try {
      const cart = await this.cartRepository.getCart(userId);
      if (!cart) {
        throw new Error("Cart not found");
      }

      for (const item of cart.items) {
        const product = await this.productRepository.findById(item.productId);
        if (!product || product.stock < item.quantity) {
          throw new Error(`Product ${product?.name || item.product} is out of stock or not available in sufficient quantity.`);
        }
      }
      return cart;
    } catch (error) {
      console.error(`Error validating cart for user ${userId}:`, error);
      throw new Error("Cart validation failed. Please check product availability.");
    }
  }
}

module.exports = CartService;
