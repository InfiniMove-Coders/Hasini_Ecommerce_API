const TimeSlotController = require('../controllers/timeslotController');
const express = require('express');
const { isAdmin, authenticate } = require('../middlewares/authenticate');
const router = express.Router();

const timeSlotController = new TimeSlotController();

router.post('/', authenticate, isAdmin, timeSlotController.createTimeSlot);
router.get('/', authenticate, isAdmin, timeSlotController.getAllTimeSlots);
router.put('/:id', authenticate, isAdmin, timeSlotController.updateTimeSlot);
router.delete('/:id', authenticate, isAdmin, timeSlotController.deleteTimeSlot);

module.exports = router;
