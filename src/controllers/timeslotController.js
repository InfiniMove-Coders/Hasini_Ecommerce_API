const TimeSlotService = require('../services/timeslotService');
const sendResponse = require('../utils/responseHandler');

class TimeSlotController {
  constructor() {
    this.timeSlotService = new TimeSlotService();
  }

  createTimeSlot = async (req, res) => {
    try {
      const timeSlot = await this.timeSlotService.createTimeSlot(req.body);
      sendResponse(res, 201, 'Time slot created successfully', { timeSlot });
    } catch (error) {
      sendResponse(res, 400, null, null, error.message);
    }
  };

  getAllTimeSlots = async (req, res) => {
    try {
      const timeSlots = await this.timeSlotService.getAllTimeSlots();
      sendResponse(res, 200, 'Time slots retrieved successfully', { timeSlots });
    } catch (error) {
      sendResponse(res, 400, null, null, error.message);
    }
  };

  updateTimeSlot = async (req, res) => {
    try {
      const timeSlot = await this.timeSlotService.updateTimeSlot(req.params.id, req.body);
      sendResponse(res, 200, 'Time slot updated successfully', { timeSlot });
    } catch (error) {
      sendResponse(res, 400, null, null, error.message);
    }
  };

  deleteTimeSlot = async (req, res) => {
    try {
      await this.timeSlotService.deleteTimeSlot(req.params.id);
      sendResponse(res, 200, 'Time slot deleted successfully');
    } catch (error) {
      sendResponse(res, 400, null, null, error.message);
    }
  };
}

module.exports = TimeSlotController;
