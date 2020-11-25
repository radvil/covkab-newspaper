const { Residence } = require('../models');
const fs = require('fs');
const path = require('path');
const imageDir = path.join(__dirname + '../../../' + 'storage/images/residences');

exports.getResidences = async (req, res, next) => {
  try {
    const residences = await Residence.find()
      .select('name postalCode')
      .sort('name');

    if (!residences) return res.json({ message: 'Failed to fetch!' });

    return res.json({
      message: 'GET all residences succeed',
      total: residences.length,
      doc: residences
    });
  } catch (ex) {
    return next(ex.message);
  }
}

exports.getResidence = async (req, res, next) => {
  try {
    const residence = await Residence.findById(req.params.id);
    if (!residence) return res.json({ message: 'Failed to fetch!' });

    return res.json({
      message: 'GET residence by id succeed',
      doc: residence
    });
  } catch (ex) {
    return next(ex.message);
  }
}

exports.createResidence = async (req, res, next) => {
  try {
    if (req.file) req.body.image = req.file.filename;

    const newResidence = new Residence({ ...req.body });

    const result = await newResidence.save();
    if (!result) return res.json({ message: 'Failed to create!' });

    return res.json({
      message: 'POST new residence succeed!',
      doc: result
    });
  } catch (ex) {
    return next(ex.message);
  }
}

exports.updateResidence = async (req, res, next) => {
  try {
    const residence = await Residence.findById(req.params.id);
    if (!residence) return res.json({ message: 'Residence Not Found!' });

    req.body.image = residence.image;

    if (req.file) {
      let imagePath = `${imageDir}/${residence.image}`;
      fs.unlink(imagePath, (err) => {
        if (err) return res.status(200);
      });
      req.body.image = req.file.filename;
    }

    const updatedResidence = residence.set({ ...req.body });

    const result = await updatedResidence.save();

    return res.json({
      message: 'PUT update residence succeed!',
      doc: result
    });
  } catch (ex) {
    return next(ex.message);
  }
}

exports.deleteResidence = async (req, res, next) => {
  try {
    const residence = await Residence.findById(req.params.id);
    if (!residence) return res.json({ message: 'Residence Not Found!' });

    await residence.remove();

    return res.json({
      message: 'DELETE Residence succeed!',
      doc: residence
    })
  } catch (ex) {
    return next(ex.message)
  }
}
