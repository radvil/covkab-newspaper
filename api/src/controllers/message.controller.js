const { Message } = require('../models');

/**
 * @DESC To GET all messages.
 */
exports.getMessages = async (req, res, next) => {
  try {
    let { select, sort, page, limit } = req.query;
    // fallback to default if no page was specified;
    page = parseInt(page) || 1;
    // fallback to default if no limit was set;
    limit = parseInt(limit) || 99;
    // hell no, wtf is this? this is how we calculate page skip;
    skip = (page - 1) * limit;

    const messages = await Message.find()
      .sort(sort)
      .select(select)
      .limit(limit)
      .skip(skip);

    if (!messages) return next(new Error(`No such messages!`));

    return res.json({
      success: true,
      message: `Get all messages succeed...`,
      total: messages.length,
      doc: messages,
    });
  } catch (err) {
    return next(ex);
  }
};

/**
 * @DESC To GET all messages.
 */
exports.getUnreadMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({ isRead: false });

    if (!messages) return next(new Error(`There is no unread messages!`));

    return res.json({
      success: true,
      message: `Get all unread messages succeed...`,
      total: messages.length,
      doc: messages,
    });
  } catch (err) {
    return next(ex);
  }
};

/**
 * @DESC To PUT message isRead = true.
 */
exports.markMessageAsRead = async (req, res, next) => {
  try {
    const param = req.params.id;

    let message = await Message.findById(param);

    if (!message) return next(new Error(`Not found!`));

    message.isRead = true;

    const updatedMessage = await message.save();

    return res.json({
      success: true,
      message: `Success mark as read`,
      doc: updatedMessage,
    });
  } catch (err) {
    return next(ex);
  }
};

/**
 * @DESC To GET message by id.
 */
exports.getMessage = async (req, res, next) => {
  try {
    let id = req.params.id;

    const message = await Message.findById(id);

    if (!message) return next(new Error(`No such message!`));

    return res.json({
      success: true,
      message: `Get message by id succeed...`,
      doc: message,
    });
  } catch (ex) {
    return next(ex);
  }
};

/**
 * @DESC To create new message.
 */
exports.createMessage = async (req, res, next) => {
  try {
    let newMessage = new Message({
      ...req.body,
    });

    await newMessage.save();

    return res.json({
      success: true,
      message: `Create message succeed...`,
      doc: newMessage,
    });
  } catch (ex) {
    return next(ex);
  }
};

/**
 * @DESC To delete message by id.
 */
exports.deleteMessage = async (req, res, next) => {
  try {
    const param = req.params.id;

    const deletedMessage = await Message.findByIdAndRemove(param);

    if (!deletedMessage) return next(new Error(`Failed to delete message!`));

    return res.json({
      success: true,
      message: `Message deleted...`,
      doc: deletedMessage,
    });
  } catch (ex) {
    return next(ex);
  }
};
