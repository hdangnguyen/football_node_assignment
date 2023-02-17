import { Request, Response } from 'express';
import { Player } from '../models/Player';

const positions = ['Goalkeeper', 'Defender', 'Midfielder', 'Forward'];
const clubs = [
  'Barcelona',
  'Bayern Munich',
  'Chelsea',
  'Juventus',
  'Liverpool',
  'Manchester City',
  'Paris Saint-Germain',
  'Real Madrid',
];

// GET /users
export const getAllPlayer = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const players = await Player.find();
    res.render('playerview', { players, positions, clubs });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving players');
  }
};

// GET /users/:id
export const getPlayerById = async (req: Request, res: Response) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) {
      return res.status(404).send('Player not found');
    }
    res.render('edit-player', { player });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// POST /users
export const createPlayer = async (req: Request, res: Response) => {
  try {
    const { name, image, club, position, goals, isCaptain } = req.body;
    const player = new Player({
      name: String(name),
      image: String(image),
      club: String(club),
      position: String(position),
      goals: Number(goals),
      isCaptain: Boolean(isCaptain),
    });
    await player.save();
    res.status(201).redirect(`/players`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding player');
  }
};

export const deleteAllPlayers = async (req: Request, res: Response) => {
  try {
    const result = await Player.deleteMany({});
    res.status(200).send(`Deleted ${result.deletedCount} players`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting players');
  }
};

export const handleUnsupportedRoute = async (req: Request, res: Response) => {
  res.status(403).send('Method not allowed');
};

// DELETE /users/:id
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const player = await Player.findByIdAndDelete(req.params.id);
    if (!player) {
      return res.status(404).send('User not found');
    }
    res.redirect('/players');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

export const updatePlayerById = async (req: Request, res: Response) => {
  try {
    const { name, image, club, position, goals, isCaptain } = req.body;
    const player = await Player.findByIdAndUpdate(req.params.id, {
      name: String(name),
      image: String(image),
      club: String(club),
      position: String(position),
      goals: Number(goals),
      isCaptain: Boolean(isCaptain),
    });
    if (!player) {
      return res.status(404).send('Player not found');
    }
    console.log('this is player', player);
    res.redirect('/players');
  } catch (error) {
    console.error(error);
    res.status(500).send('Update player failed');
  }
};
