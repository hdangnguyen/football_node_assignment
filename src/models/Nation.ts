import mongoose from 'mongoose';
// create schema
const NationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true }
);
// create model
export const Nation = mongoose.model('Nation', NationSchema);
