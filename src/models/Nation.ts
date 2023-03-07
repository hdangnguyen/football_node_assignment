import mongoose from 'mongoose';

export interface INationDocument extends mongoose.Document {
  name: string;
  description: string;
}

// create schema
const NationSchema = new mongoose.Schema<INationDocument>(
  {
    name: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true }
);
// create model
export const NationModel = mongoose.model<INationDocument>(
  'Nation',
  NationSchema
);
