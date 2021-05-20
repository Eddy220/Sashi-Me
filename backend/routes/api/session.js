const express = require('express');
const asyncHandler = require('express-async-handler');
// asyncHandler wraps async route handlers/custom middlewares
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();

// Log in
router.post(
  '/',
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



module.exports = router;
