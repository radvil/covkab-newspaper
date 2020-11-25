const { Portfolio, User } = require('../models');
const slugify = require('slugify');
const fs = require('fs');
const path = require('path');
const imageDir = path.join(__dirname + '../../../' + 'storage/images/portfolios');

/**
 * @DESC To GET all portfolios.
 */
const getPortfolios = async (req, res, next) => {
  try {
    let { select, sort, page, limit } = req.query;

    page = parseInt(page) || 1;

    limit = parseInt(limit) || 99;

    skip = (page - 1) * limit;

    const portfolios = await Portfolio.find()
      .populate('author', 'name nik photo')
      .sort(sort)
      .select(select)
      .limit(limit)
      .skip(skip);

    if (!portfolios) return next(new Error(`No such portfolios!`));

    return res.json({
      success: true,
      message: `Get all portfolios succeed...`,
      total: portfolios.length,
      doc: portfolios,
    });
  } catch (ex) {
    return next(ex);
  }
};

/**
 * @DESC To GET portfolio by id.
 */
const getPortfolio = async (req, res, next) => {
  try {
    let id = req.params.id;

    const portfolio = await Portfolio.findById(id).populate('author', 'name');

    if (!portfolio) return next(new Error(`No such portfolio!`));

    return res.json({
      success: true,
      message: `Get portfolio by id succeed...`,
      doc: portfolio,
    });
  } catch (ex) {
    return next(ex);
  }
};

/**
 * @DESC To create new portfolio.
 */
const createPortfolio = async (req, res, next) => {
  try {
    req.body.slug = new Date().toISOString();

    // portfolio image should be required!
    if (!req.file) return next('Image is required!');

    req.body.image = req.file.filename;

    // author is required;
    if (!req.body.author) return next(`Author is required!`);

    const fetchedAuthor = await User.findById(req.body.author);

    if (!fetchedAuthor) return next(`No such author!`);

    let newPortfolio = new Portfolio({ ...req.body });

    await newPortfolio.save();

    return res.json({
      success: true,
      message: `Create portfolio succeed...`,
      doc: newPortfolio,
    });
  } catch (ex) {
    fs.unlink(req.file.path, (err) => {
      return err
        ? next(new Error(`Failed to unlinked!`))
        : next(new Error(`File unlinked succeed...\n${ex}`));
    });
  }
};

/**
 * @DESC To update existed portfolio by id.
 */
const updatePortfolio = async (req, res, next) => {
  try {
    if (!req.body.author) return next(new Error(`Author is required!`));

    const fetchedAuthor = await User.findById(req.body.author);

    if (!fetchedAuthor) return next(new Error(`No such author!`));

    // only caption is updatable;
    const updatedPortfolio = await Portfolio.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );

    return res.json({
      success: true,
      message: `Update portfolio succeed...`,
      doc: updatedPortfolio,
    });
  } catch (ex) {
    return next(ex);
  }
};

/**
 * @DESC To delete existed portfolio by id.
 */
const deletePortfolio = async (req, res, next) => {
  try {
    const param = req.params.id;

    const deletedPortfolio = await Portfolio.findByIdAndRemove(param);

    if (!deletedPortfolio) return next(new Error(`No such portfolio!`));

    // remove associated image from fs;
    let imagePath = `${imageDir}/${deletedPortfolio.image}`;
    fs.unlink(imagePath, (err) => {
      if (err) return res.status(200);
    });

    return res.json({
      success: true,
      message: `Delete portfolio succeed...`,
      doc: deletedPortfolio,
    });
  } catch (ex) {
    return next(ex);
  }
};

module.exports = {
  getPortfolios,
  getPortfolio,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
};
