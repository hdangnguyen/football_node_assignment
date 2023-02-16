import { Request, Response } from 'express';
import { Interface } from 'readline';
import { Player } from '../models/Player';

// GET /users
export const getAllPlayer = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const players = await Player.find();
    res.render('playerview', { players });
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
    res.render('playerview', { player });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// POST /users
export const createPlayer = async (req: Request, res: Response) => {
  try {
    const { name, image, club, position, goals, isCaptain } = req.body;
    // const user = new Player({ name, email, password });
    const player = new Player({
      name,
      image,
      club,
      position,
      goals,
      isCaptain,
    });
    await player.save();
    res.status(201).redirect(`/players/${player._id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding player');
  }
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

module.exports = {
  getAllPlayer,
  getPlayerById,
  createPlayer,
  deleteUser,
};
