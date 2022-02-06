const express = require('express');
const router = express.Router();
const controllers  = require('../controllers/admin');
const {check,body} = require('express-validator/check')


// router.get('/addNote',controllers.getAddNote)
router.post('/post_images'
,controllers.addNote)
module.exports = router;


// ,[
//     body('title','invalid title title mustbe 5 characters long')
//     .isLength({min:5})
//     .isAlphanumeric(),
//     body('content')
//     .isAlphanumeric()
//     ]