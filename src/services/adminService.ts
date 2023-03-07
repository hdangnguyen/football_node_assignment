// get all users from the database
import { UserModel, I_UserDocument } from '../models/UserSchema';
import { DocumentDefinition } from 'mongoose';

export async function getAllUsers(): Promise<
  DocumentDefinition<I_UserDocument>[]
> {
  try {
    const users = await UserModel.find().lean();
    return users;
  } catch (error) {
    throw error;
  }
}
