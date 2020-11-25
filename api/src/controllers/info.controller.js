const { About, Contact } = require('../models');

/**
 * @DESC To GET abouts.
 */
const getAbouts = async (req, res, next) => {
  try {
    let abouts = await About.find({});
    if (!abouts) return next(new Error(`No items!`));

    let about;

    if (!abouts.length) {
        about = new About({
            title: "Default Title",
            content: "Default Content"
        });

        await about.save();
    } else {
        about = abouts[0];
    }

    res.json({
      success: true,
      message: `Get abouts succeed`,
      doc: about,
    });
  } catch (ex) {
    return next(ex.message);
  }
};

/**
 * @DESC To create/update about.
 * @Method PUT
 * In the client side create can be only applied if collection is still empty;
 * In the client side update can be only applied if collection is not empty;
 * @param about[0]._id (updatable only)
 *
 */
const updateAbout = async (req, res, next) => {
  try {
    const abouts = await About.find();
    if (!abouts) return res.send('Failed to fetch');

    let newAbout;

    if (abouts.length) {
      const aboutId = abouts[0]['_id'];
      const result = await About.findByIdAndUpdate(
        aboutId,
        { ...req.body },
        { new: true }
      );

      !result
        ? res.send('Failed to update!')
        : (newAbout = { ...result['_doc'] });
    } else {
      const result = await new About({ ...req.body }).save();

      !result
        ? res.send('Failed to create!')
        : (newAbout = { ...result['_doc'] });
    }

    return res.json({
      success: true,
      message: `Update succeed...`,
      doc: newAbout,
    });
  } catch (ex) {
    return next(new Error(ex.message));
  }
};

/**
 * @DESC To GET contacts.
 */
const getContacts = async (req, res, next) => {
  try {
    let contacts = await Contact.find({});
    if (!contacts) return next(new Error(`No items!`));

    const contact = contacts[0];

    return res.json({
      success: true,
      message: `Get contact succeed`,
      doc: contact,
    });
  } catch (ex) {
    return next(ex.message);
  }
};

/**
 * @DESC To create/update contact.
 * @Method POST
 * In the client side create can be only applied if collection is still empty;
 * In the client side update can be only applied if collection is not empty;
 * @param contact[0]._id (updatable only)
 *
 */
const updateContact = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    if (!contacts) return res.send('Failed to fetch');

    let newContact;

    if (contacts.length) {
      const contactId = contacts[0]['_id'];
      const result = await Contact.findByIdAndUpdate(
        contactId,
        { ...req.body },
        { new: true }
      );

      !result
        ? res.send('Failed to update!')
        : (newContact = { ...result['_doc'] });
    } else {
      const result = await new Contact({ ...req.body }).save();

      !result
        ? res.send('Failed to create!')
        : (newContact = { ...result['_doc'] });
    }

    return res.json({
      success: true,
      message: `Update succeed...`,
      doc: newContact,
    });
  } catch (ex) {
    return next(ex.message);
  }
};

module.exports = {
  getAbouts,
  updateAbout,
  getContacts,
  updateContact,
};
