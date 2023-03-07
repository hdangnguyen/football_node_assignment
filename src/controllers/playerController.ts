import { Request, Response } from 'express';
import { PlayerModel } from '../models/Player';
import { NationModel } from '../models/Nation';

const positions = ['Goalkeeper', 'Defender', 'Midfielder', 'Forward'];

//get dashboard
export const getDashboard = async (req: Request, res: Response) => {
  try {
    const players = await PlayerModel.find().populate('nation', 'name');
    const nations = await NationModel.find();
    res.render('dashboard', { players, positions, nations });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving players');
  }
};

// GET /users
export const getAllPlayer = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log(req.user);
    const players = await PlayerModel.find().populate('nation', 'name');
    const nations = await NationModel.find();
    res.render('playerview', { players, positions, nations });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving players');
  }
};

// GET /users/:id
export const getPlayerById = async (req: Request, res: Response) => {
  try {
    const player = await PlayerModel.findById(req.params.id);
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
    const { body } = req;
    console.log('this is req.body', req.body);
    // Check if name already exists
    const existingPlayer = await PlayerModel.findOne({ name: body.name });
    if (existingPlayer) {
      return res.status(400).send('Player with this name already exists');
    }
    if (body.isCaptain === 'on') {
      body.isCaptain = true;
    } else {
      body.isCaptain = false;
    }

    const newPlayer = await PlayerModel.create(body);
    console.log('this is player', newPlayer);
    res.status(201).redirect(`/players`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding player');
  }
};

export const deleteAllPlayers = async (req: Request, res: Response) => {
  try {
    const result = await PlayerModel.deleteMany({});
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
    const player = await PlayerModel.findByIdAndDelete(req.params.id);
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
    const { body } = req;
    // Check if name already exists
    const existingPlayer = await PlayerModel.findOne({ name: body.name });
    if (existingPlayer && body.name != existingPlayer.name) {
      return res.status(400).send('Player with this name already exists');
    }
    if (body.isCaptain === 'on') {
      body.isCaptain = true;
    } else {
      body.isCaptain = false;
    }
    const player = await PlayerModel.findByIdAndUpdate(req.params.id, body);
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
