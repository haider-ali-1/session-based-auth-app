import { User } from '../models/user.model.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

export const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });
  res.redirect('/login');
});

export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) throw new Error('incorrect email or password');
  // session only created if we attach some data otherwise not
  req.session.user = { _id: user._id, name: user.name };
  res.redirect('/dashboard');
});
