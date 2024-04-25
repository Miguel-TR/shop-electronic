const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const guestMiddleware = require('../middlewares/guestMiddleware');
const rememberUserMiddleware = require('../middlewares/rememberUserMiddleware');
const {inputsValues, validationErrors} = require('../middlewares/validateRegister');
const upload =  require('../middlewares/userAvatar');

// router.get('/',rememberUserMiddleware ,userController.index); no necesaria - esta en productosRoutes
router.get('/search', userController.search);
router.get('/login', userController.renderLogin);
router.get('/register/', userController.createUser);
router.post('/register',upload.single('img'), inputsValues, validationErrors,userController.storeUser);
router.post('/login',userController.loginProcess)
router.post('/user/:email',userController.logOut)
router.get('/user/:email',rememberUserMiddleware,guestMiddleware,userController.renderProfile);
router.get('/userDetail/:id',rememberUserMiddleware,guestMiddleware,userController.renderDetail);
router.get('/editUser/:id',rememberUserMiddleware,guestMiddleware,userController.renderEdit);
router.put('/editUser/:id',rememberUserMiddleware,guestMiddleware,upload.single('img'),userController.renderUpdate);
router.get('/editUserPass/:id',rememberUserMiddleware,guestMiddleware,userController.renderEditPass);
router.put('/editUserPass/:id',rememberUserMiddleware,guestMiddleware,userController.renderUpdatePass);

module.exports = router;