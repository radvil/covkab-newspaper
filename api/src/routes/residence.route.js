const router = require('express').Router();
const {
  getResidences,
  getResidence,
  createResidence,
  updateResidence,
  deleteResidence
} = require('../controllers/residence.controller');
const { checkAuth, checkRole } = require('../controllers/user.controller');
const { uploadResidencePhoto } = require('../middlewares/multer');

router.route('/')
  .get(getResidences)
  .post(checkAuth, checkRole(['root']), uploadResidencePhoto, createResidence);

router
  .route('/:id').get(getResidence)
  .put(checkAuth, checkRole(['root']), uploadResidencePhoto, updateResidence)
  .delete(checkAuth, checkRole(['root']), deleteResidence);

module.exports = router;
