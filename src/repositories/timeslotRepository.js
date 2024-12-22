const TimeSlot = require('../models/timeslot');
const CrudRepository = require('./crudRepository');

class TimeSlotRepository extends CrudRepository {
  constructor() {
    super(TimeSlot);
  }
}

module.exports = TimeSlotRepository;