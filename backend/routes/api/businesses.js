// import express and asyncHandler middleware
const express = require('express');
const asyncHandler = require('express-async-handler');
const { Business, Review, Image } = require('../../db/models/');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateBusiness = [
  check('')
]

// CRUD: read all businesses
router.get('/', asyncHandler(async(req, res) => {
  const businesses = await Business.findAll();
  return res.json(businesses)
}))

// CRUD: read business by id
router.get('/:id', asyncHandler(async(req, res) => {
  const businessId = parseInt(req.params.id)
  const business = await Business.findByPk(businessId)
  return res.json(business)
}))



module.exports = router;
