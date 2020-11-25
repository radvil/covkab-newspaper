const { Schema, model } = require("mongoose");

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
    },
    content: {
      type: String,
      required: true,
      minlength: 5,
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
      default: false,
    },
    image: {
      type: String, // note this save only filename;
      maxlength: 255
    },
    imageAlt: {
        type: String,
        maxlength: 255
    }
  },
  { timestamps: true }
);

exports.Article = model("Article", articleSchema);