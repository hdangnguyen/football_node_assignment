import express from 'express';
const Router = express.Router;
import {
  guardRoute,
  privateRoute,
  adminRoute,
} from '../controllers/authController';
import * as userController from '../controllers/userController';
import * as adminController from '../controllers/adminController';
const router = Router();
router.get('/', guardRoute, userController.userProfile);

router.route('/dashboard').get(guardRoute, userController.userProfile);

router
  .route('/profile')
  .get(guardRoute, privateRoute, userController.userProfile)
  .put(guardRoute, privateRoute, userController.updateUserProfile);

//create public route and private route
router
  .route('/admin/userManagement')
  .get(guardRoute, adminRoute, privateRoute, adminController.getAllUsers);

export default router;
