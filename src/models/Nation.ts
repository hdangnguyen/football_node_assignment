import mongoose from 'mongoose';
// create schema
const NationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});
// create model
const Nation = mongoose.model('Nation', NationSchema);
module.exports = { Nation };
