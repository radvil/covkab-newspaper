const { Schema, model } = require('mongoose');

const messageSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: [255, 'Max 255 chars!'],
    },
    phone: {
      type: String,
      minlength: [10, 'Min 18 chars!'],
      maxlength: [18, 'Max 18 chars!'],
      required: true,
      immutable: true,
      trim: true
    },
    message: {
      type: String,
      required: true,
      maxlength: [1000, 'Max 1000 chars!'],
    },
    isRead: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

exports.Message = model('Message', messageSchema);
