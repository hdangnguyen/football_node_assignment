import express from 'express';
const Router = express.Router;
import {
  getLogin,
  login,
  getRegister,
  register,
} from '../controllers/authController';
const router = Router();
router.route('/login').get(getLogin).post(login);
router.route('/register').get(getRegister).post(register);
export default router;

//Get login page
