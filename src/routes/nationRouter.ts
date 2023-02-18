import express from 'express';
import {
  getAllNations,
  getNationById,
  createNation,
  updateNationById,
  deleteNation,
} from '../controllers/nationController';
const router = express.Router();
router.get('/', getAllNations);
router.route('/nations').get(getAllNations).post(createNation);
router
  .route('/nations/:id')
  .get(getNationById)
  .put(updateNationById)
  .delete(deleteNation);

export default router;
