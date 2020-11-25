const { Schema, model } = require('mongoose');

const aboutSchema = new Schema({
  title: {
    type: String,
    maxlength: [255, 'Max 255 chars!'],
  },
  content: {
    type: String,
    maxlength: [5000, 'Max 5000 chars!'],
  },
});

const contactSchema = new Schema({
  intro: {
    type: String,
    maxlength: [500, 'Max 255 chars!'],
  },
  address: {
    type: String,
    maxlength: [255, 'Max 12 chars!'],
  },
  phone: {
    type: String,
    required: true,
    maxlength: [13, 'Max length 255!'],
    trim: true,
  },
  email: {
    type: String,
    required: true,
    maxlength: [255, 'Max 255 chars!'],
  },
});

exports.About = model('About', aboutSchema);
exports.Contact = model('Contact', contactSchema);
