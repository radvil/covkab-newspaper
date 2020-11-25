const router = require('express').Router();
const {
  registerUser,
  loginUser,
  serializeUser,
  checkAuth,
  checkRole,
} = require('../controllers/user.controller');

router.route('/login').post(loginUser);
router.route('/register').post(registerUser);
// router.route('/register').post(checkAuth, checkRole(['root']), registerUser);
router.route('/profile').get(checkAuth, serializeUser);

module.exports = router;
