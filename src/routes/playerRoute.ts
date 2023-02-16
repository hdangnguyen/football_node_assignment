import { Router } from 'express';
import {
  getAllPlayer,
  getPlayerById,
  createPlayer,
} from '../controllers/playerController';
const playerRoute = Router();
playerRoute.get('/', getAllPlayer);
export default playerRoute;
