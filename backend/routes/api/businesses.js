// import express and asyncHandler middleware
const express = require('express');
const asyncHandler = require('express-async-handler');
const { Business, Review, Image } = require('../../db/models/');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require("../../utils/auth");
const router = express.Router();

// const validateBusiness = [
//   check('')
// ]

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

// CRUD: create a business, how exciting!
router.post('/', asyncHandler(async(req, res) => {
  const { name, owner_id, address, city, state, phone_number, business_website} = req.body
  const businessCreate = await Business.create({ name:name, owner_id: owner_id, address:address, city:city, state:state, phone_number:phone_number, business_website:business_website })
  return res.json({ businessCreate })
}))

// CRUD: update a business by id
router.put('/:id', asyncHandler(async(req, res) => {
  const businessId = parseInt(req.params.id)
  const business = await Business.findByPk(businessId)
  console.log(business)
  if (business) {
    const { name, owner_id, address, city, state, phone_number, business_website } = req.body
    const businessUpdate = await business.update({ name:name, owner_id: owner_id, address:address, city:city, state:state, phone_number:phone_number, business_website:business_website })
    return res.json({ businessUpdate })
  }
}))

// CRUD: delete a business by id
router.delete('/:id', asyncHandler(async(req,res) => {
  const businessId = parseInt(req.params.id)
  const business = await Business.findByPk(businessId)

  if (business) {
    await business.destroy();
    return res.json()
  }
}))

module.exports = router;
