const { model, Schema } = require('mongoose');

const residenceSchema = new Schema({
  postalCode: {
    type: String,
    maxlength: [255, 'Max 255 chars!']
  },
  name: {
    type: String,
    maxlength: [255, 'Max 255 chars!'],
    unique: true,
    required: true
  },
  image: {
    type: String,
    maxlength: [255, 'Max 255 chars!'],
  },
  description: {
    type: String,
    maxlength: [1000, 'Max 1000 chars!']
  }
})

exports.Residence = model('Residence', residenceSchema);
