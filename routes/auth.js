const express = require('express');
const {body} = require('express-validator')
const nodemailer = require('nodemailer');
const router = express.Router()
const controllers = require('../controllers/auth')
const isAuth = require('../middleware/is-auth');

//node mail transporter


router.get('/signUp', isAuth.isAuth__, controllers.GetsignUp)

router.post('/signup',
[
 body('email', 'invalid email')
 .isEmail(),
 body('password','inalid password it must contain more than 5 characters.')
 .isLength({min:5}).trim(),
 body('firstName', 'invalid first name').isLength({min:2}),
 body('secondName', 'invalid second name').isLength({min:2})
],
isAuth.isAuth__, controllers.postSignUp)

//loggin 
router.get('/loggin', isAuth.isAuth__, controllers.Getloggin)

router.post('/loggin',
[
 body('email', 'invalid email')
 .isEmail(),
 body('password','inalid password it must contain more than 5 characters.')
 .isLength({min:5}).trim(),
 body('firstName', 'invalid first name').isLength({min:2}),
 body('secondName', 'invalid second name').isLength({min:2})
],
isAuth.isAuth__, controllers.psotLoggin)



module.exports = router;



