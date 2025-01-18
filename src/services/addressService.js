const AddressRepository = require("../repositories/addressRepository");
const User = require("../models/user");
const addressRepository = new AddressRepository();

class AddressService {
  async createAddress(data) {
    try {
      const userDetails= await User.findById(data.userId);
      if (!userDetails) {
        throw new Error("User not found");
      }

      if (userDetails.address) {
        throw new Error("Address for this user already exists");
      }
      const address = await addressRepository.create(data);
      if (!address) {
        throw new Error("Failed to create the address");
      }
      const user = await User.findByIdAndUpdate(
        data.userId,
        { address: address._id },
        { new: true }
      );
      if (!user) {
        throw new Error("Failed to update the user with the address");
      }
      return address;
    } catch (error) {
      throw new Error(`Error creating address: ${error.message}`);
    }
  }

  // Get address by ID
  async getAddressById(id) {
    try {
      const address = await addressRepository.findById(id);
      if (!address) {
        throw new Error("Address not found");
      }
      return address;
    } catch (error) {
      throw new Error(`Error fetching address by ID: ${error.message}`);
    }
  }

  // Get addresses by user ID
  async getAddressesByUser(userId) {
    try {
      const addresses = await addressRepository.findByUserId(userId);
      if (!addresses || addresses.length === 0) {
        throw new Error("No addresses found for this user");
      }
      return addresses;
    } catch (error) {
      throw new Error(`Error fetching addresses by user ID: ${error.message}`);
    }
  }

  // Update address by ID
  async updateAddress(id, updates) {
    try {
      const updatedAddress = await addressRepository.updateById(id, updates);
      if (!updatedAddress) {
        throw new Error("Address not found for update");
      }
      return updatedAddress;
    } catch (error) {
      throw new Error(`Error updating address: ${error.message}`);
    }
  }

  async deleteAddress(userId, addressId) {
    try {
      // Delete the address
      const deletedAddress = await addressRepository.deleteById(addressId);
      if (!deletedAddress) {
        throw new Error("Address not found for deletion");
      }

      // Update the user's address reference to null
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { address: null },
        { new: true }
      );

      if (!updatedUser) {
        throw new Error("User not found or unable to update address reference");
      }

      return { message: "Address deleted successfully", deletedAddress };
    } catch (error) {
      throw new Error(`Error deleting address: ${error.message}`);
    }
  }
}

module.exports = new AddressService();
