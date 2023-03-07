import { DocumentDefinition } from 'mongoose';
import { UserModel, I_UserDocument } from '../models/UserSchema';
import bcrypt from 'bcrypt';

export async function findUsername(
  user: DocumentDefinition<I_UserDocument>
): Promise<string> {
  try {
    // check if user already exists
    const userExists = await UserModel.findOne({ username: user.username });
    return userExists as any;
  } catch (error) {
    throw error;
  }
}
const saltRounds = 8;

export async function register(
  userData: DocumentDefinition<Pick<I_UserDocument, 'username' | 'password'>>
): Promise<void> {
  try {
    const user = new UserModel({
      ...userData,
      email: '',
      image: '',
      name: userData.username,
      YOB: 0,
      isAdmin: false,
    });

    user.password = await bcrypt.hash(user.password, saltRounds);
    await user.save();
  } catch (error) {
    throw error;
  }
}

export async function login(user: DocumentDefinition<I_UserDocument>) {
  try {
    const foundUser = await UserModel.findOne({ username: user.username });

    if (!foundUser) {
      throw new Error('Name of user is not correct');
    }
    const isMatch = bcrypt.compareSync(user.password, foundUser.password);
    if (isMatch) {
      console.log(isMatch);
    } else {
      throw new Error('Password is not correct');
    }
  } catch (error) {
    throw error;
  }
}
