import express from 'express';
import {
  guardRoute,
  privateRoute,
  adminRoute,
} from '../controllers/authController';
import * as nationController from '../controllers/nationController';
const router = express.Router();
router.get('/', nationController.getAllNations);
router
  .route('/nations')
  .get(guardRoute, nationController.getAllNations)
  .post(guardRoute, privateRoute, adminRoute, nationController.createNation);
router
  .route('/nations/:id')
  .get(guardRoute, privateRoute, adminRoute, nationController.getNationById)
  .put(guardRoute, privateRoute, adminRoute, nationController.updateNationById)
  .delete(guardRoute, privateRoute, adminRoute, nationController.deleteNation);

export default router;
