import mongoose from 'mongoose';

export interface I_UserDocument extends mongoose.Document {
  username: string;
  password: string;
  email: string;
  image: string;
  name: string;
  YOB: number;
  isAdmin: boolean;
  // googleId?: string;
}

const UserSchema: mongoose.Schema<I_UserDocument> = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String },
    image: { type: String },
    name: { type: String },
    YOB: { type: Number },
    isAdmin: { type: Boolean, required: true, default: false },
    // googleId: { type: String },
  },
  { timestamps: true }
);

UserSchema.virtual('loginMethod').get(function () {
  return this.password ? 'local' : 'google';
});

export const UserModel = mongoose.model<I_UserDocument>('User', UserSchema);
