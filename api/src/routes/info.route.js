const router = require('express').Router();
const {
  getAbouts,
  updateAbout,
  getContacts,
  updateContact,
} = require('../controllers/info.controller');
const { checkAuth, checkRole } = require('../controllers/user.controller');

router
  .route('/about')
  .get(getAbouts)
  .put(checkAuth, checkRole(['root']), updateAbout); // unloggedIn?

router
  .route('/contact')
  .get(getContacts)
  .put(checkAuth, checkRole(['root']), updateContact);

module.exports = router;
