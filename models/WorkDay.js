const mongoose = require('mongoose');

const WorkDaySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  day: {
    type: Date,
    required: true
  },
  from: {
    type: Date,
    required: true
  },
  to: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = WorkDay = mongoose.model('workday', WorkDaySchema);
