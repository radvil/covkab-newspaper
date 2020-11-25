const router = require('express').Router();
const {
  getUsers,
  getUser,
  updateUser,
  updatePassword,
  deleteUser,
} = require('../controllers/user.controller');
const { checkAuth, checkRole } = require('../controllers/user.controller');

router.route('/').get(getUsers);
router
  .route('/:id')
  .get(getUser)
  .put(checkAuth, checkRole(['root']), updateUser)
  .delete(checkAuth, checkRole(['root']), deleteUser);
router
  .route('/updatePassword/:id')
  .put(checkAuth, checkRole(['root', 'admin']), updatePassword);

module.exports = router;
