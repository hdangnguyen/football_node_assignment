import { Request, Response } from 'express';
import { NationModel } from '../models/Nation';
import { PlayerModel } from '../models/Player';
// GET all nations
export const getAllNations = async (req: Request, res: Response) => {
  try {
    console.log(req.user);
    const nations = await NationModel.find();
    res.render('nationview', { nations, user: req.user });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving nations');
  }
};

// GET nation by id
export const getNationById = async (req: Request, res: Response) => {
  try {
    const nation = await NationModel.findById(req.params.id);
    if (!nation) {
      return res.status(404).send('Nation not found');
    }
    res.render('edit-nation', { nation });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// POST new nation
export const createNation = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    // Check if name already exists
    const existingNation = await NationModel.findOne({ name: name });
    if (existingNation) {
      return res.status(400).send('Nation with this name already exists');
    }
    const nation = new NationModel({
      name: String(name),
      description: String(description),
    });
    await nation.save();
    res.status(201).redirect(`/nation`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding nation');
  }
};

// PUT update nation by id
export const updateNationById = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const nation = await NationModel.findById(req.params.id);
    if (!nation) {
      return res.status(404).send('Nation not found');
    }
    nation.name = name;
    nation.description = description;
    await nation.save();
    res.status(200).redirect(`/nation`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating nation');
  }
};

// DELETE nation by id
export const deleteNation = async (req: Request, res: Response) => {
  try {
    const nation = await NationModel.findById(req.params.id);
    const players = await PlayerModel.find({ nation: req.params.id });
    if (players.length > 0) {
      // Prevent the nation from being deleted and inform the user
      return res.status(400).send('Cannot delete nation with assigned players');
    }

    if (!nation) {
      return res.status(404).send('Nation not found');
    }
    await nation.remove();
    res.status(200).redirect(`/nation`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting nation');
  }
};

// DELETE all nations
export const deleteAllNations = async (req: Request, res: Response) => {
  try {
    const result = await NationModel.deleteMany({});
    res.status(200).send(`Deleted ${result.deletedCount} nations`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting nations');
  }
};

// GET unsupported route
export const handleUnsupportedRoute = async (req: Request, res: Response) => {
  res.status(403).send('Method not allowed');
};
