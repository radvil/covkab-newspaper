const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Min 2 chars!'],
    maxlength: [255, 'Max 255 chars!'],
  },
  nik: {
    type: String,
    minlength: [10, 'Min 10 chars!'],
    maxlength: [20, 'Max 20 chars!'],
    required: true,
    trim: true,
    unique: true,
  },
  phone: {
    type: String,
    maxlength: [255, 'Max length 255!'],
    trim: true,
  },
  role: {
    type: String,
    enum: ['admin', 'root', 'user'],
    default: 'user',
    required: true,
  },
  password: {
    type: String,
    required: true,
    maxlength: 255,
  },
  residence: {
    type: String,
    maxlength: [255, 'Max 255 chars!'],
  },
  address: {
    type: String,
    maxlength: [255, 'Max 255 chars!'],
  },
  lastLogin: Date,
  updatedAt: Date,
  createdAt: {
    type: Date,
    immutable: true,
    default: Date.now,
  },
});

const User = model('User', userSchema);

module.exports.User = User;