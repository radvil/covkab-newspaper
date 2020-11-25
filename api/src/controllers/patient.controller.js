const { Patient } = require('../models');
const fs = require('fs');
const path = require('path');
const imageDir = path.join(__dirname + '../../../' + 'storage/images/patients');

const getDocumentsLength = async (req, res, next) => {
  const totalDocuments = await Patient.countDocuments();

  if (!totalDocuments)
    return res.json({ message: 'Failed to get documents length' });

  return res.json(totalDocuments);
}
/**
 * @DESC To GET all patients.
 */
const getPatients = async (req, res, next) => {
  try {
    let { select, sort, page, limit } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 99;
    skip = (page - 1) * limit;

    const { field, value } = req.query;
    const queryObj = {};

    if (field && value) {
      // queryObj[field] = value;
      queryObj[field] = { $regex: `${value}`, $options: 'i' };
    }

    const patients = await Patient.find(queryObj)
      .populate('author', 'name')
      .sort(sort)
      .select(select)
      .limit(limit)
      .skip(skip);

    if (!patients) return next(res.status(400).send(`No such patients!`));

    return res.json({ message: 'GET all patients succeed!', doc: patients });
  } catch (ex) {
    return next(ex);
  }
};

/**
 * @DESC To GET patient by id.
 */
const getPatient = async (req, res, next) => {
  try {
    let id = req.params.id;

    const patient = await Patient.findById(id);

    if (!patient) return next(res.status(400).send(`No such patient!`));

    return res.json({
      success: true,
      message: `Get patient by id succeed...`,
      doc: patient,
    });
  } catch (ex) {
    return next(ex);
  }
};

/**
 * @DESC To create new patient.
 */
const createPatient = async (req, res, next) => {
  try {
    // const existedPatient = await Patient.findOne({ nik: req.body.nik });

    // if (existedPatient) return res.send(`NIK already exists!`);

    if (req.file) req.body.photo = req.file.filename;

    const createdPatient = await new Patient({
      ...req.body,
    }).save();

    if (!createdPatient) return next(new Error(`Failed to create patient!`));

    return res.json({
      success: true,
      message: `Create patient succeed...`,
      doc: createdPatient,
    });
  } catch (ex) {
    return next(new Error(ex));
  }
};

/**
 * @DESC To update existed patient by id.
 */
const updatePatient = async (req, res, next) => {
  try {
    const param = req.params.id;

    const fetchedPatient = await Patient.findById(param);

    if (!fetchedPatient) return next(new Error(`No such patient!`));

    req.body.photo = fetchedPatient.photo;

    if (req.file) {
      let imagePath = `${imageDir}/${fetchedPatient.image}`;
      fs.unlink(imagePath, (err) => {
        if (err) return res.status(200);
      });
      req.body.photo = req.file.filename;
    }

    const updatedPatient = await fetchedPatient.set({ ...req.body }).save();

    if (!updatedPatient) return next(new Error('Failed to save!'));

    return res.json({
      success: true,
      message: `Update patient succeed...`,
      doc: updatedPatient,
    });
  } catch (ex) {
    // fs.unlinkSync(req.file.path, (err) => {
    //   if (err) throw new Error();
    // });

    return next(new Error(ex));
  }
};

/**
 * @DESC To delete existed patient by id.
 */
const deletePatient = async (req, res, next) => {
  try {
    const param = req.params.id;

    const deletedPatient = await Patient.findByIdAndRemove(param);

    if (!deletedPatient) return next(new Error(`No such patient!`));

    // remove associated image from fs;
    let imagePath = `${imageDir}/${deletedPatient.image}`;
    fs.unlink(imagePath, (err) => {
      if (err) return res.status(200);
    });

    return res.json({
      success: true,
      message: `Delete patient succeed...`,
      doc: deletedPatient,
    });
  } catch (ex) {
    return next(ex);
  }
};

module.exports = {
  getDocumentsLength,
  getPatients,
  getPatient,
  createPatient,
  updatePatient,
  deletePatient,
};
