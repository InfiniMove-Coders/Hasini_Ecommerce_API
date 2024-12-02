class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  // Create a new document
  async create(data) {
    try {
      const document = new this.model(data);
      return await document.save();
    } catch (error) {
      throw new Error(`Error creating document: ${error.message}`);
    }
  }

  // Find a document by ID
  async findById(id) {
    try {
      return await this.model.findById(id);
    } catch (error) {
      throw new Error(`Error finding document by ID: ${error.message}`);
    }
  }

  // Find all documents (with optional filters)
  async findAll(filter = {}) {
    try {
      return await this.model.find(filter);
    } catch (error) {
      throw new Error(`Error finding documents: ${error.message}`);
    }
  }

  // Update a document by ID
  async updateById(id, updateData) {
    try {
      return await this.model.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
      throw new Error(`Error updating document by ID: ${error.message}`);
    }
  }

  // Delete a document by ID
  async deleteById(id) {
    try {
      return await this.model.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error deleting document by ID: ${error.message}`);
    }
  }
}

module.exports = CrudRepository;
