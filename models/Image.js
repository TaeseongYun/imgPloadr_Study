const mongoose = require("mongoose"),
  path = require("path")

const ImageSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  filename: { type: String },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now }
})

ImageSchema.virtual("uniqueId").get(() => {
  return this.filename.replace(path.extname(this.filename), "")
})

module.exports = mongoose.model("image", ImageSchema)
