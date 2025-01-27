class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  // Create a new document
  async create(data) {
    try {
      const document = await this.model.create(data);
      return document;
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
  async findAll(
    filters = {},
    paginationOptions = {},
    populateOptions = {},
    sortOptions = { createdAt: -1 },
    projectionFields = ""
  ) {
    try {
      let { page, pageSize } = paginationOptions;
      let skip = 0;
      if (page && pageSize) {
        page = parseInt(page);
        pageSize = parseInt(pageSize);
        skip = pageSize * (page - 1);
      }
      return await this.model
        .find(filters, projectionFields)
        .sort(sortOptions)
        .skip(skip)
        .limit(pageSize)
        .populate(populateOptions);
    } catch (error) {
      throw new Error(`Error finding documents: ${error.message}`);
    }
  }

  // Update a document by ID
  async updateById(id, updateData) {
    try {
      return await this.model.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
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
