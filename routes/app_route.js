const express = require('express');
const appLicationRouters = require('../controllers/app_controller')
const router = express.Router();
const controllers  = require('../controllers/app_controller');
const isAuth = require('../middleware/is-auth')


router.get('/', isAuth.isAuth, controllers.getHome)
router.get('/404',controllers.get404)

module.exports = router;