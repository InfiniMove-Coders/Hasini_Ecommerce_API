const CrudRepository = require("./crudRepository"); // Adjust the path as needed
const Address = require("../models/address"); // Assuming you have an Address model

class AddressRepository extends CrudRepository {
  constructor() {
    super(Address); // Pass Address model to CrudRepository
  }
  async findByUserId(userId) {
    try {
      const userAddress=await Address.find({ userId });
      console.log("userAddress",userAddress);

      return userAddress;
    } catch (error) {
      throw new Error(`Error finding addresses by user ID: ${error.message}`);
    }
  } 
}

module.exports = AddressRepository;
