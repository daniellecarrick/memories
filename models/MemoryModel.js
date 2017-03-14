var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var memorySchema = new Schema({
  name: { type: String },
  body: { type: String },
  posNeg: { type: Number },
  age: { type: Number },
  location: { type: String }
});

var Memory = mongoose.model("Memory", memorySchema);
module.exports = Memory;
