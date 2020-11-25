const router = require('express').Router();
const {
  getMessages,
  getMessage,
  getUnreadMessages,
  markMessageAsRead,
  createMessage,
  deleteMessage,
} = require('../controllers/message.controller');
const { checkAuth, checkRole } = require('../controllers/user.controller');

router
  .route('/')
  .get(checkAuth, checkRole(['root', 'admin']), getMessages)
  .post(createMessage);
router
  .route('/unread')
  .get(checkAuth, checkRole(['root', 'admin']), getUnreadMessages);
router
  .route('/:id')
  .get(checkAuth, checkRole(['root', 'admin']), getMessage)
  .delete(checkAuth, checkRole(['root']), deleteMessage);
router
  .route('/:id/markasread')
  .put(checkAuth, checkRole(['root', 'admin']), markMessageAsRead);

module.exports = router;
