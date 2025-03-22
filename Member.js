const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  contact: { type: String, required: true },
  membershipType: { type: String, enum: ['Monthly', 'Yearly'], required: true },
  startDate: { type: Date, default: Date.now },
  attendance: [{ type: Date }] // Array to store attendance dates
});

module.exports = mongoose.model('Member', memberSchema);