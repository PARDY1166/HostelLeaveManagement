const mongoose = require("mongoose");

const WardenSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true, maxLength: 10, minLength: 10 },
  email: { type: String, required: true, unique: true, minLength: 13, maxLength: 50 },
  password: { type: String, required: true },
  hostel: { type: String, required: true, maxLength: 10,unique:true},
});

const Warden =  new mongoose.model("warden", WardenSchema);
module.exports = Warden;