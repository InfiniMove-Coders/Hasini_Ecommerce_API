const AddressService = require('../services/addressService');

class AddressController {
  async getAllAddresses(req, res) {
    try {
      const addresses = await AddressService.getAllAddresses();
      res.json(addresses);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async createAddress(req, res) {
    try {
      const data = req.body;
      const address = await AddressService.createAddress(data);
      res.json(address);
    } catch (error) {
      res.status(400).json({ message: 'Invalid request' });
    }
  }

  async getAddressById(req, res) {
    try {
      const id = req.params.id;
      const address = await AddressService.getAddressById(id);
      res.json(address);
    } catch (error) {
      res.status(404).json({ message: 'Address not found' });
    }
  }

  async getAddressesByUser(req, res) {
    try {
      const userId = req.params.id;
      const addresses = await AddressService.getAddressesByUser(userId);
      res.json(addresses);
    } catch (error) {
      res.status(404).json({ message: 'User not found' });
    }
  }

  async updateAddress(req, res) {
    try {
      const id = req.params.id;
      const data = req.body;
      const address = await AddressService.updateAddress(id, data);
      res.json(address);
    } catch (error) {
      res.status(400).json({ message: 'Invalid request' });
    }
  }

  async deleteAddress(req, res) {
    try {
      const id = req.params.id;
      await AddressService.deleteAddress(id);
      res.json({ message: 'Address deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

module.exports = AddressController; 