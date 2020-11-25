const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { User } = require('../models/user.model');
const { SECRET } = require('../configs/env.config');

/**
 * @DESC To GET all users.
 */
const getUsers = async (req, res, next) => {
  try {
    let { select, sort } = req.query;

    const users = await User.find().sort(sort).select(select);

    if (!users) return next(res.status(400).send(`No such users!`));

    return res.json({
      success: true,
      message: `Get all users succeed...`,
      total: users.length,
      doc: users,
    });
  } catch (ex) {
    return next(ex);
  }
};

/**
 * @DESC To GET user by id.
 */
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.json({ message: 'No such user!' });

    return res.json({ message: `Get User Succeed...`, doc: user });
  } catch (ex) {
    return next(ex.message);
  }
};

/**
 * @DESC To update existed user by id.
 */
const updateUser = async (req, res, next) => {
  try {
    const updatedAt = new Date().toISOString();

    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      ...req.body,
      updatedAt
    }, { new: false });

    if (!updatedUser) return res.json({ message: 'User Not Found!' });

    return res.json({
      message: `User Updated...`,
      doc: updatedUser,
    });
  } catch (ex) {
    return next(ex.message);
  }
};

/**
 * @DESC To update password.
 */
const updatePassword = async (req, res, next) => {
  try {
    const param = req.params.id;
    const updatedAt = new Date().toISOString();

    const fetchedUser = await User.findById(param);

    if (!fetchedUser) return res.send('User not found!');

    const hashedPassword = await bcrypt.hash(req.body.newPassword, 12);

    if (!hashedPassword) return next(new Error('Failed to hash password!'));

    const updatedUser = await User.findByIdAndUpdate(
      param,
      { password: hashedPassword, updatedAt },
      { new: true }
    );

    if (!updatedUser) return next(new Error(`User not found!`));

    return res.json({
      success: true,
      message: `Update password succeed..`,
      doc: {
        name: updatedUser.name,
        nik: updatedUser.nik,
        role: updatedUser.role,
        newPassword: hashedPassword,
        lastUpdate: updatedUser.updatedAt,
      },
    });
  } catch (ex) {
    return next(ex);
  }
};

/**
 * @DESC To delete existed user by id.
 */
const deleteUser = async (req, res, next) => {
  try {
    const param = req.params.id;
    // do delete user;
    const deletedUser = await User.findByIdAndRemove(param);
    // If deletion failed;
    if (!deletedUser)
      return next(new Error(res.status(400).send(`Failed to delete user!`)));
    // Finale!!;
    return res.json({
      success: true,
      message: `Delete user succeed...`,
      doc: deletedUser,
    });
  } catch (ex) {
    return next(ex);
  }
};

/**
 * @DESC To Register the user (admin, root)
 */
const registerUser = async (req, res, next) => {
  try {
    let { nik, password } = req.body;

    // validate nik;
    let nikIsAvailable = await validateNik(nik);

    if (!nikIsAvailable) return next(new Error('Nik already taken!'));

    // create hashed password;
    const hashedPassword = await bcrypt.hash(password, 12);

    if (!hashedPassword) return next(new Error('Failed to hash password!'));

    // save new user;
    const newUser = await new User({
      ...req.body,
      password: hashedPassword,
    }).save();

    if (!newUser) return next(new Error('Failed to save new user!'));

    return res.json({
      message: 'Registration Succeed!',
      doc: newUser,
    });
  } catch (error) {
    // We can implement logger package like 'Winston' here
    return next(error);
  }
};

/**
 * @DESC To Login the user (admin, root)
 */
const loginUser = async (req, res, next) => {
  const { nik, password } = req.body;
  const lastLogin = new Date().toISOString();

  // check registered nik;
  const user = await User.findOne({ nik });

  if (!user) return next(new Error('User not found!'));

  // compare passwords;
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return next(new Error('Invalid password'));

  // sign the token;
  let token = jwt.sign(
    {
      user_id: user._id,
      role: user.role,
      name: user.name,
    },
    SECRET,
    { expiresIn: '7 days' }
  );

  const updatedUser = user.set({ lastLogin });
  await updatedUser.save();

  return res.json({
    success: true,
    message: 'Login Succeed',
    doc: {
      _id: updatedUser._id,
      name: updatedUser.name,
      role: updatedUser.role,
      token: `Bearer ${token}`,
    },
  });
};

/**
 * @DESC Serialize user before send it back as req.user;
 */
const serializeUser = (req, res, next) => {
  let user = req.user;

  return res.json({
    _id: user._id,
    name: user.name,
    nik: user.nik,
    phone: user.phone,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  });
};

/**
 * @DESC Passport for checkAuth;
 */
const checkAuth = passport.authenticate('jwt', { session: false });

/**
 * @DESC Check User Role;
 */
const checkRole = (roles) => (req, res, next) => {
  !roles.includes(req.user.role)
    ? res.status(401).json({ message: 'Unauthorized', success: false })
    : next();
};

/**
 * @DESC Validate pre registration;
 */
const validateNik = async (nik) => {
  let user = await User.findOne({ nik });
  return user ? false : true; // Return false if there is a user
};

module.exports = {
  getUsers,
  getUser,
  updateUser,
  updatePassword,
  deleteUser,

  registerUser,
  loginUser,
  checkAuth,
  serializeUser,
  checkRole,
};
