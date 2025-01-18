const mongoose=require("mongoose");
const Cart = require("../models/cart");
const CrudRepository = require("./crudRepository");

class CartRepository extends CrudRepository {
  constructor() {
    super(Cart);
  }
  getCart = async (userId) => {
    try {
      const cart=await Cart.findOne({userId}).populate("items.productId").lean();
      return cart;
    } catch (error) {
      throw new Error("Failed to retrieve cart");
    }
  };
}

module.exports = CartRepository;
