const express = require('express')
const router = express.Router()
const auth = require('../middlewares/authMiddleware.js')
const {viewDetails} = require('../controllers/userController.js')

router.get('/profile', auth,viewDetails)

module.exports = router