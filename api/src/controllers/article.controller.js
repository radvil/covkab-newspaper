const { Article, User } = require('../models');
const slugify = require('slugify');
const fs = require('fs');
const path = require('path');
const imageDir = path.join(__dirname + '../../../' + 'storage/images/articles');

const getDocumentsLength = async (req, res, next) => {
  const totalDocuments = await Article.countDocuments();

  if (!totalDocuments)
    return res.json({ message: 'Failed to get documents length' });

  return res.json(totalDocuments);
}

/**
 * @DESC To GET all articles.
 */
const getArticles = async (req, res, next) => {
  try {
    let { select, sort, page, limit } = req.query;
    // fallback to default if no page was specified;
    page = parseInt(page) || 1;
    // fallback to default if no limit was set;
    limit = parseInt(limit) || 99;
    // hell no, wtf is this? this is how we calculate page skip;
    skip = (page - 1) * limit;
    // search query;
    const { field, value } = req.query;
    // initialize for fallback to default if empty;
    const queryObj = {};
    if (field && value) {
      queryObj[field] = { $regex: `${value}`, $options: 'i' };
    }

    const articles = await Article.find(queryObj)
      .populate('author', 'name')
      .sort(sort)
      .select(select)
      .limit(limit)
      .skip(skip);

    if (!articles) return next(new Error(`No such articles!`));

    return res.json({
      success: true,
      message: `Get all articles succeed...`,
      total: articles.length,
      doc: articles,
    });
  } catch (ex) {
    return next(ex);
  }
};

/**
 * @DESC To GET article by id.
 */
const getArticle = async (req, res, next) => {
  try {
    let id = req.params.id;

    const article = await Article.findById(id).populate('author', 'name');

    if (!article) return next(new Error(`No such article!`));

    return res.json({
      success: true,
      message: `Get article by id succeed...`,
      doc: article,
    });
  } catch (ex) {
    return next(ex);
  }
};

/**
 * @DESC To GET article by slug.
 */
const getArticleBySlug = async (req, res, next) => {
  try {
    let slug = req.params.slug;

    const article = await Article.findOne({ slug }).populate('author', 'name');

    if (!article) return next(new Error(`No such article!`));

    return res.json({
      success: true,
      message: `Get article by slug succeed...`,
      doc: article,
    });
  } catch (ex) {
    return next(ex);
  }
};

/**
 * @DESC To create new article.
 */
const createArticle = async (req, res, next) => {
  try {
    if (req.body.title)
      req.body.slug = `${slugify(req.body.title, {
        lower: true,
      })}_${new Date().toISOString()}`;

    const fetchedAuthor = await User.findById(req.body.author);

    if (!fetchedAuthor) return next(new Error(`No such author!`));

    // if (!req.file) req.body.image = 'article_image_placeholder.png';

    req.body.image = req.file.filename;

    let newArticle = new Article({
      ...req.body,
    });

    await newArticle.save();

    return res.json({
      success: true,
      message: `Create article succeed...`,
      doc: {
        _id: newArticle._id,
        title: newArticle.title,
        author: newArticle.author,
      },
    });
  } catch (ex) {
    // fs.unlinkSync(req.file.path, (err) => {
    //   if (err) throw new Error();
    // });

    return next(ex);
  }
};

/**
 * @DESC To update existed article by id.
 */
const updateArticle = async (req, res, next) => {
  try {
    const param = req.params.id;

    const fetchedAuthor = await User.findById(req.body.author);

    if (!fetchedAuthor) return next(new Error(`No such author!`));

    const fetchedArticle = await Article.findById(param);

    if (!fetchedArticle) return next(new Error(`Article not found!`));

    req.body.image = fetchedArticle.image;

    if (req.file) {
      // remove associated image from fs;
      let imagePath = `${imageDir}/${fetchedArticle.image}`;
      fs.unlink(imagePath, (err) => {
        if (err) return res.status(200);
      });

      req.body.image = req.file.filename;
    }

    fetchedArticle.set({ ...req.body }).save();

    return res.json({
      success: true,
      message: `Update article succeed...`,
      doc: {
        _id: fetchedArticle._id,
        title: fetchedArticle.title,
        author: fetchedArticle.author,
      },
    });
  } catch (ex) {
    return next(ex);
  }
};

/**
 * @DESC To delete existed article by id.
 */
const deleteArticle = async (req, res, next) => {
  try {
    const param = req.params.id;

    const deletedArticle = await Article.findByIdAndRemove(param);

    if (!deletedArticle) return next(new Error(`No such article!`));

    // remove associated image from fs;
    let imagePath = `${imageDir}/${deletedArticle.image}`;
    fs.unlink(imagePath, (err) => {
      if (err) return res.status(200);
    });

    return res.json({
      success: true,
      message: `Delete article succeed...`,
      doc: {
        _id: deletedArticle._id,
        title: deletedArticle.title,
        author: deletedArticle.author,
      },
    });
  } catch (ex) {
    return next(ex);
  }
};

module.exports = {
  getDocumentsLength,
  getArticles,
  getArticle,
  getArticleBySlug,
  createArticle,
  updateArticle,
  deleteArticle,
};
