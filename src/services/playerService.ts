import { DocumentDefinition } from 'mongoose';
import { PlayerModel, IPlayerDocument } from '../models/Player';

// get all nations from the database
export async function getAllNations(): Promise<
  DocumentDefinition<IPlayerDocument>[]
> {
  try {
    const players = await PlayerModel.find().populate('nation', 'name');
    return players;
  } catch (error) {
    throw error;
  }
}
