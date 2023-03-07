import { DocumentDefinition } from 'mongoose';
import { UserModel, I_UserDocument } from '../models/UserSchema';

// find email exist in database
export async function findEmail(
  user: DocumentDefinition<I_UserDocument>
): Promise<string> {
  try {
    const emailExist = await UserModel.findOne({ email: user });
    console.log('this is userEmail1: ', user);
    return emailExist as any;
  } catch (error) {
    throw error;
  }
}
// edit user profile
export async function editProfile(
  userData: DocumentDefinition<I_UserDocument>,
  username: string
) {
  try {
    const user = await UserModel.findOneAndUpdate(
      { username: username },
      userData,
      { new: true }
    );
    return user;
  } catch (error) {
    throw error;
  }
}
