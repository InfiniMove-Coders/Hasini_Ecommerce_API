const Address = require("../models/address");
const CrudRepository = require("./crudRepository");

class AddressRepository extends CrudRepository {
  constructor() {
    super(Address);
  }

  findById = async (id) => {
    try {
      return await this.model.findById(id);
    } catch (error) {
      throw new Error("Failed to retrieve address");
    }
  };

  findByFullName = async (fullName) => {
    try {
      return await this.model.findOne({ fullName });
    } catch (error) {
      throw new Error("Failed to retrieve address");
    }
  };

  findAll = async (filter = {}) => {
    try {
      return await this.model.find(filter).sort({ createdAt: -1 });
    } catch (error) {
      throw new Error("Failed to retrieve addresses");
    }
  };
}

module.exports = AddressRepository;