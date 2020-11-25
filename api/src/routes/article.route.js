const router = require('express').Router();
const {
  getDocumentsLength,
  getArticles,
  getArticle,
  getArticleBySlug,
  createArticle,
  updateArticle,
  deleteArticle,
} = require('../controllers/article.controller');

const { uploadArticleImage } = require('../middlewares/multer');
const { checkAuth, checkRole } = require('../controllers/user.controller');

// define children routes of /articles
router
  .route('/')
  .get(getArticles)
  .post(
    checkAuth,
    checkRole(['root', 'admin']),
    uploadArticleImage,
    createArticle
  );

router.route('/totalDocuments').get(getDocumentsLength);

router
  .route('/:id')
  .get(getArticle)
  .put(
    checkAuth,
    checkRole(['root', 'admin']),
    uploadArticleImage,
    updateArticle
  )
  .delete(checkAuth, checkRole(['root', 'admin']), deleteArticle);

router.route('/:slug').get(getArticleBySlug);

module.exports = router;
