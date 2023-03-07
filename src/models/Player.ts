import mongoose from 'mongoose';
import { NationModel, INationDocument } from '../models/Nation';
export interface IPlayerDocument extends mongoose.Document {
  name: string;
  image: string;
  career: string;
  position: string;
  goals: number;
  nation: INationDocument['_id'];
  isCaptain: boolean;
}

// create a schema
const PlayerSchema: mongoose.Schema<IPlayerDocument> = new mongoose.Schema(
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
export const PlayerModel = mongoose.model<IPlayerDocument>(
  'Player',
  PlayerSchema
);
