import express from 'express';
import * as playerController from '../controllers/playerController';
const router = express.Router();
import {
  guardRoute,
  privateRoute,
  adminRoute,
} from '../controllers/authController';

router.route('/').get((req, res) => {
  res.redirect('/players');
});
router
  .route('/players')
  .get(guardRoute, playerController.getAllPlayer)
  .post(privateRoute, privateRoute, adminRoute, playerController.createPlayer)
  .put(privateRoute, playerController.handleUnsupportedRoute)
  .delete(
    privateRoute,
    privateRoute,
    adminRoute,
    playerController.deleteAllPlayers
  );

router
  .route('/players/:id')
  .get(privateRoute, privateRoute, adminRoute, playerController.getPlayerById)
  .delete(privateRoute, privateRoute, adminRoute, playerController.deleteUser)
  .put(
    privateRoute,
    privateRoute,
    adminRoute,
    playerController.updatePlayerById
  )
  .post(
    privateRoute,
    privateRoute,
    adminRoute,
    playerController.handleUnsupportedRoute
  );

router.route('/dashboard').get(playerController.getDashboard);

export default router;
