import mongoose from 'mongoose';

// create schema
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String },
    YOB: { type: Number },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
