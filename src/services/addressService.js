const AddressRepository = require("../repositories/addressRepository");
const addressRepository = new AddressRepository();

class AddressService {
  async createAddress(data) {
    try {
      const existingAddress = await addressRepository.findByFullName(data.fullName);
      if (existingAddress) {
        throw new Error("Address with this full name already exists");
      }
      return await addressRepository.create(data);
    } catch (error) {
      throw new Error(`Error creating address: ${error.message}`);
    }
  }

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

  async getAllAddresses() {
    try {
      return await addressRepository.findAll();
    } catch (error) {
      throw new Error(`Error fetching addresses: ${error.message}`);
    }
  }

  async updateAddressById(id, updates) {
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

  async deleteAddressById(id) {
    try {
      const deletedAddress = await addressRepository.deleteById(id);
      if (!deletedAddress) {
        throw new Error("Address not found for deletion");
      }
      return deletedAddress;
    } catch (error) {
      throw new Error(`Error deleting address: ${error.message}`);
    }
  }

  async findAddressByFullName(fullName) {
    try {
      const address = await addressRepository.findByFullName(fullName);
      if (!address) {
        throw new Error("Address not found with this full name");
      }
      return address;
    } catch (error) {
      throw new Error(`Error fetching address by full name: ${error.message}`);
    }
  }
}

module.exports = new AddressService();