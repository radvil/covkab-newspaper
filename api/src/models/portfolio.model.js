const { Schema, model } = require('mongoose');

const portfolioSchema = new Schema(
  {
    image: {
      type: String, // note this save only filename;
      maxlength: 255,
    },
    imageAlt: {
        type: String,
        maxlength: 255,
    },
    caption: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 500,
    },
    author: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true,
      minlength: 20,
      maxlength: 24,
    },
    slug: {
      type: String,
      lowercase: true,
      unique: true,
      minlength: 5,
      maxlength: 510,
    },
    isPublished: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

exports.Portfolio = model('Portfolio', portfolioSchema);
