import { NextFunction, Request, Response } from 'express';
import { getErrorMessage } from '../utils/getErrorMessage';
import { validatePassword } from '../utils/passwordValidation';
require('dotenv').config();
import * as authService from '../services/authService';
import passport from 'passport';

// GET /login
export const getLogin = (req: Request, res: Response) => {
  res.render('login');
};

// GET /register
export const getRegister = (req: Request, res: Response) => {
  res.render('register');
};

export const login = async (req: Request, res: Response) => {
  try {
    passport.authenticate('local', (err: any, user: any, info: any) => {
      if (err) {
        return err;
      }
      if (!user) {
        return res.redirect('/auth/login');
      } else {
        req.logIn(user, (err) => {
          if (err) {
            return err;
          }
          console.log(user);
          return res.redirect('/');
        });
      }
    })(req, res);
    // const foundUser = await authService.login(req.body);
    // res.status(200).send(foundUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

export const register = async (req: Request, res: Response) => {
  const { password, confirmPassword } = req.body;

  if (!password || !confirmPassword || password !== confirmPassword) {
    console.log('passwords do not match', password, confirmPassword);
    return res.redirect('/auth/register');
  }

  const strongPassword = validatePassword(password);
  console.log('password strong?', strongPassword);
  if (!strongPassword) {
    console.log('Password is too week');
    return res.redirect('/auth/register');
  }

  try {
    // Check if username already exists
    const usernameExists = await authService.findUsername(req.body);
    if (usernameExists) {
      console.log('username already exists');
      return res.redirect('/auth/register');
    } // Create new user
    await authService.register(req.body);

    // Return success response
    return res.redirect('/auth/login');
  } catch (error) {
    console.log('error');
    return res.status(500).send(getErrorMessage(error));
  }
};

export const guardRoute = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (request.user) {
    response.locals.user = request.user;
  } else {
    response.locals.user = null;
  }
  next();
};

export const privateRoute = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (!request.user) {
    response.redirect('/auth/login');
  } else {
    next();
  }
};
export const adminRoute = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const requestUser: any = request.user;
  if (!requestUser.isAdmin) {
    response.status(401).send('Unauthorized');
  } else {
    next();
  }
};

export const logout = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/auth/login');
    }
  });
};
