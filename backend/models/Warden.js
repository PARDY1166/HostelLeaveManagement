const mongoose = require("mongoose");

const WardenSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: Number, required: true, unique: true, maxLength: 10, minLength: 10 },
  email: { type: String, required: true, unique: true, minLength: 13, maxLength: 50 },
  password: { type: String, required: true },
  hostel: { type: String, required: true, maxLength: 10 },
});
module.exports = new mongoose.model("warden", WardenSchema);