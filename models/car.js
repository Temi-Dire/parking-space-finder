const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let CarSchema = new Schema({
  vehicle: String,
  place: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("SpaceAvailable", CarSchema);
