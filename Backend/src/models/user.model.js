const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  role: { 
    type: String, 
    enum: ["student", "hr"], 
    required: true 
  },
  name: String,
  email: { 
    type: String, 
    unique: true 
  },
  password: String,
}, { timestamps: true });


const User = mongoose.model("User", userSchema);
module.exports = User;
