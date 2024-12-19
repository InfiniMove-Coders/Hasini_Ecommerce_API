const TimeSlotRepository = require('../repositories/timeslotRepository');

class TimeSlotService {
  constructor() {
    this.timeSlotRepository = new TimeSlotRepository();
  }

  createTimeSlot = async (data) => {
    try {
      return await this.timeSlotRepository.create(data);
    } catch (error) {
      throw new Error(`Create time slot failed: ${error.message}`);
    }
  };

  getAllTimeSlots = async () => {
    try {
      return await this.timeSlotRepository.findAll();
    } catch (error) {
      throw new Error(`Get time slots failed: ${error.message}`);
    }
  };

  updateTimeSlot = async (id, data) => {
    try {
      return await this.timeSlotRepository.updateById(id, data);
    } catch (error) {
      throw new Error(`Update time slot failed: ${error.message}`);
    }
  };

  deleteTimeSlot = async (id) => {
    try {
      return await this.timeSlotRepository.deleteById(id);
    } catch (error) {
      throw new Error(`Delete time slot failed: ${error.message}`);
    }
  };
}

module.exports = TimeSlotService;