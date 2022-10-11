const express = require('express');
const router = express.Router();
const controllers  = require('../controllers/admin');
const {check,body} = require('express-validator/check')
const isAuth = require('../middleware/is-auth');
const { route } = require('./app_route');


// router.get('/addNote',controllers.getAddNote)
router.post('/post_images'
, isAuth.isAuth, controllers.addNote)
module.exports = router;

router.get('/get_profile/:userId'
, isAuth.isAuth, controllers.getProfile)

router.delete('/delete', isAuth.isAuth, controllers.deleteImage)
router.post('/edit_profile',isAuth.isAuth,controllers.editProfile)
router.get('/prfile_editing',isAuth.isAuth,controllers.profileEditing)
router.post('/profile-reset',isAuth.isAuth,controllers.profileReset);


module.exports = router;
