import mongoose from 'mongoose';
// create a schema
const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  club: { type: String, required: true },
  position: { type: String, required: true },
  goals: { type: Number, required: true },
  isCaptain: { type: Boolean, required: true },
});

// create a model
export const Player = mongoose.model('Player', playerSchema);
