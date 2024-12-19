const mongoose = require('mongoose');

const timeSlotSchema = new mongoose.Schema({
  timeSlot: {
    type: String,
    required: true,
    match: /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM) - (0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/, // Validates format HH:MM AM/PM - HH:MM AM/PM
  },
});

const TimeSlot = mongoose.model('TimeSlot', timeSlotSchema);

module.exports = TimeSlot;
