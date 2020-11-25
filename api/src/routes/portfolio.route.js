const router = require('express').Router();
const {
  getPortfolios,
  getPortfolio,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
} = require('../controllers/portfolio.controller');

const { uploadPortfolioImage } = require('../middlewares/multer');
const { checkAuth, checkRole } = require('../controllers/user.controller');

// define children routes of /portfolios.
router
  .route('/')
  .get(getPortfolios)
  .post(
    checkAuth,
    checkRole(['root', 'admin']),
    uploadPortfolioImage,
    createPortfolio
  );

router
  .route('/:id')
  .get(getPortfolio)
  .put(checkAuth, checkRole(['root', 'admin']), updatePortfolio) // image is unupdatable;
  .delete(checkAuth, checkRole(['root', 'admin']), deletePortfolio);

module.exports = router;
