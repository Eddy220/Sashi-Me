const express = require('express');
const asyncHandler = require('express-async-handler');
// asyncHandler wraps async route handlers/custom middlewares
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();
// check function from express-validator will validate request body
// validation error handler we created, must be imported for routes
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// middleware that will check request body to have key of credential
// with either username or email, and key of password
const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors,
];

// Log in
router.post(
  '/',
  validateLogin,
  asyncHandler(async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.login({ credential, password });
    // calls login static method from user model

    if (!user) {
      // if no user returned, create error and invoke next error-handle middleware
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = ['The provided credentials were invalid.'];
      return next(err);
    }

    await setTokenCookie(res, user);
    // if there is a user returned from login static method
    // call setTokenCookie and return JSON res with user info
    return res.json({
      user,
    });
  }),
);

// Log out API route will delete the token cookie from res, and return JSON
router.delete(
  '/',
  (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);

// Restore session user will return session user as JSON under key of user
// if no session, returns JSON with empty object
router.get(
  '/',
  restoreUser,
  (req, res) => {
    const { user } = req;
    if (user) {
      return res.json({
        user: user.toSafeObject()
      });
    } else return res.json({});
  }
);


module.exports = router;
