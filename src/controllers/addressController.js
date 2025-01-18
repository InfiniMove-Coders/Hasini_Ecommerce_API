const AddressService = require('../services/addressService');

class AddressController {
  async createAddress(req, res) {
    try {
      const userId = req.user._id;
      const data = { ...req.body, userId };
      const address = await AddressService.createAddress(data);
      res.status(201).json(address);
    } catch (error) {
      res.status(400).json({ message: error.message});
    }
  }

  async getAddressById(req, res) {
    try {
      const id = req.params.id;
      const address = await AddressService.getAddressById(id);
      if (!address) {
        return res.status(404).json({ message: 'Address not found' });
      }
      res.json(address);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async getAddressesByUser(req, res) {
    try {
      const userId = req.user._id;
      const addresses = await AddressService.getAddressesByUser(userId);
      if (!addresses || addresses.length === 0) {
        return res.status(404).json({ message: 'No addresses found for this user' });
      }
      res.json(addresses);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async updateAddress(req, res) {
    try {
      const id = req.params.id;
      const data = req.body;
      const updatedAddress = await AddressService.updateAddress(id, data);
      if (!updatedAddress) {
        return res.status(404).json({ message: 'Address not found' });
      }
      res.json(updatedAddress);
    } catch (error) {
      res.status(400).json({ message: 'Invalid request' });
    }
  }

  async deleteAddress(req, res) {
    try {
      const addressId = req.params.id;
      const userId=req.user._id;
      const address = await AddressService.deleteAddress(userId,addressId);
      if (!address) {
        return res.status(404).json({ message: 'Address not found' });
      }
      res.json({ message: 'Address deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

module.exports = AddressController;
