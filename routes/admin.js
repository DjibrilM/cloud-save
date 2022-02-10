const express = require('express');
const router = express.Router();
const controllers  = require('../controllers/admin');
const {check,body} = require('express-validator/check')
const isAuth = require('../middleware/is-auth')

// router.get('/addNote',controllers.getAddNote)
router.post('/post_images'
, isAuth.isAuth, controllers.addNote)
module.exports = router;



router.get('/get_profile/:userId'
, isAuth.isAuth, controllers.getProfile)
module.exports = router;
