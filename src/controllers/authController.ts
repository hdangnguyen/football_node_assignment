import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { validatePassword } from '../utils/Validation';
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

// GET /login
export const getLogin = (req: Request, res: Response) => {
  res.render('login');
};
// GET /register
export const getRegister = (req: Request, res: Response) => {
  res.render('register');
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    // Find the user in the database
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '1h',
      }
    );

    // Return the token to the client
    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

export const register = async (req: Request, res: Response) => {
  const { username, password, confirmPassword } = req.body;

  if (!password || !confirmPassword || password !== confirmPassword) {
    console.log('passwords do not match', username, password, confirmPassword);
    return res.redirect('/auth/register');
  }

  const strongPassword = validatePassword(password);
  console.log('password strong?', strongPassword);
  if (!strongPassword) {
    console.log('Password is too week');
    return res.redirect('/auth/register');
  }

  try {
    // Check if user already exists
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(409).json({ message: 'Username already taken' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      username,
      password: hashedPassword,
      isAdmin: false,
      name: username,
      YOB: 0,
    });
    await user.save();

    // Return success response
    return res.redirect('/auth/login');
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: 'Something went wrong, please try again later' });
  }
};
