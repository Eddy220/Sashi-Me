const express = require('express');
const asyncHandler = require('express-async-handler');
const { Review } = require('../../db/models/');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();

// CRUD: read all reviews
router.get('/', asyncHandler(async(req,res) => {
  const reviews = await Review.findAll();
  return res.json(reviews)
}))

// CRUD: post a comment
router.post('/', asyncHandler(async(req,res) => {
  const { user_id, comment, rating, business_id } = req.body
  const reviewCreate = await Review.create({ user_id:user_id, comment:comment, rating:rating, business_id:business_id })
  return res.json({ reviewCreate })
}))

// CRUD: Delete a comment
router.delete('/:id', asyncHandler(async(req,res) => {
  const reviewId = parseInt(req.params.id)
  const review = await Business.findByPk(reviewId)

  if (review) {
    await review.destroy();
    return res.json()
  }
}))

// CRUD: Update a comment
router.put('/:id', asyncHandler(async(req, res) => {
  const reviewId = parseInt(req.params.id)
  const review = await Business.findByPk(reviewId)

  if (review) {
    const { user_id, comment, rating, business_id  } = req.body
    const reviewUpdate = await review.update({ user_id, comment, rating, business_id  })
    return res.json({ reviewUpdate })
  }
}))


module.exports = router;
