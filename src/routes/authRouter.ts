import express from 'express';
import passport from 'passport';
const Router = express.Router;
import * as authController from '../controllers/authController';
const router = Router();
router.route('/login').get(authController.getLogin).post(authController.login);

router
  .route('/register')
  .get(authController.getRegister)
  .post(authController.register);
router.route('/logout').get(authController.logout);

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/login' }),
  (req, res) => {
    // Successful authentication, redirect to homepage
    res.redirect('/');
  }
);

export default router;

//Get login page
