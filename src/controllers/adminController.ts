import { NextFunction, Request, Response } from 'express';
import * as adminService from '../services/adminService';

// get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await adminService.getAllUsers();
    const filteredUsers = users.filter((user) => !user.isAdmin);
    res.render('user-list', { users: filteredUsers });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
