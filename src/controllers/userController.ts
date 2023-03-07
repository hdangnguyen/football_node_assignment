import { Request, Response } from 'express';
import * as userService from '../services/userService';

// get /profile from session
export const userProfile = (req: Request, res: Response) => {
  res.render('user-profile', { user: req.user });
};

// POST /users
export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const username = (req.user as any).username;
    const userData = req.body;
    //check if email exists
    const isEmailExists: any = await userService.findEmail(userData.email);
    if (isEmailExists && isEmailExists.email != userData.email) {
      console.log(isEmailExists, 'email already exists');
      return res.redirect('/user/profile');
    }

    if (userData.YOB == null || userData.YOB == '') {
      userData.YOB = 0;
    }
    if (userData.name == '') {
      userData.name = username;
    }
    const updatedUser = await userService.editProfile(userData, username);
    console.log('this is updated user: ', updatedUser);
    if (updatedUser) {
      return res.redirect('/user/profile');
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
