const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const guestMiddleware = require('../middlewares/guestMiddleware');
const rememberUserMiddleware = require('../middlewares/rememberUserMiddleware');

// router.get('/',rememberUserMiddleware ,userController.index); no necesaria - esta en productosRoutes
router.get('/search', userController.search);
router.get('/login', userController.renderLogin);
router.get('/register', userController.renderRegister);
router.post('/login',userController.loginProcess)
router.get('/user/logout',userController.logOut)
router.get('/user/:email',rememberUserMiddleware,guestMiddleware,userController.renderProfile);


module.exports = router;