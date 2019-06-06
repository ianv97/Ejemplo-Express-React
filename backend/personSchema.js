const mongoose = require("mongoose");

const PersonSchema = new mongoose.Schema({
  name: String,
  dni: Number
});

module.exports = mongoose.model("Person", PersonSchema);
