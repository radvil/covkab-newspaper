const { Schema, model } = require('mongoose');

const patientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [2, 'Min 2 chars!'],
      maxlength: [255, 'Max 255 chars!'],
    },
    nik: {
      type: String,
      default: 'Tidak ditentukan',
      maxlength: [16, 'Max 16 chars!'],
      trim: true,
    },
    photo: {
      type: String, // only save filename!
      maxlength: [255, 'Max length 255 chars!'],
      trim: true,
    },
    phone: {
      type: String,
      // default: 'Kosong',
      maxlength: [255, 'Max length 255!'],
      trim: true,
    },
    residence: {
      type: String,
      maxlength: [255, 'Max 255 chars!'],
    },
    address: {
      type: String,
      maxlength: [255, 'Max 255 chars!'],
    },
    gender: {
      type: String,
      enum: ['laki-laki', 'perempuan', 'unknown'],
    },
    status: {
      type: String,
      enum: ['odp', 'pdp', 'otg', 'positive', 'negative', 'respawn'],
      required: true
    },
    hasMudik: {
      type: Boolean,
      default: false
    },
    caseNumber: {
      type: String,
      maxlength: 255,
      // default: 'Tidak ditentukan'
    },
    detail: {
      type: String,
      maxlength: [5000, 'Maax 5000 chars allowed!'],
      // default: 'Belum ada keterangan lanjutan.'
    },
    author: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true,
      minlength: 20,
      maxlength: 24,
    },
  },
  { timestamps: true }
);

exports.Patient = model('Patient', patientSchema);
