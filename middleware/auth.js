import { asyncHandler } from './asyncHandler.js';

const verifyLogin = asyncHandler(async (req, res, next) => {
  console.log(req.session);
  if (!req.session.user) {
    throw new Error('Unathorized');
  }
  next();
});

export { verifyLogin };
