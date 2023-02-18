import express from 'express';

import {
  getAllPlayer,
  getPlayerById,
  createPlayer,
  deleteUser,
  deleteAllPlayers,
  handleUnsupportedRoute,
  updatePlayerById,
} from '../controllers/playerController';
const router = express.Router();
router.route('/').get((req, res) => {
  res.redirect('/players');
});
router
  .route('/players')
  .get(getAllPlayer)
  .post(createPlayer)
  .put(handleUnsupportedRoute)
  .delete(deleteAllPlayers);

router
  .route('/players/:id')
  .get(getPlayerById)
  .delete(deleteUser)
  .put(updatePlayerById)
  .post(handleUnsupportedRoute);

export default router;
