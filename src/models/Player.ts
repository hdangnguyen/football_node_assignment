import mongoose from 'mongoose';
// create a schema
const playerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    career: { type: String },
    position: { type: String, required: true },
    goals: { type: Number, required: true, default: 0 },
    nation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Nation',
      required: true,
    },
    isCaptain: { type: Boolean, required: true },
  },
  { timestamps: true }
);

// create a model
export const Player = mongoose.model('Player', playerSchema);
