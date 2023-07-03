const express = require('express')
const router = express.Router()
const apartmentController = require('./apartmentController')
router.get('/', apartmentController.getApartment )
router.post('/', apartmentController.addApartment)
router.patch('/', apartmentController.updateApartment )
router.delete('/', apartmentController.deleteApartment)
module.exports= router