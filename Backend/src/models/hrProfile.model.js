const mongoose = require("mongoose");

const hrProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  companyName: String,
  position: String,
  contact: String,
}, { timestamps: true });

module.exports = mongoose.model("HrProfile", hrProfileSchema);
