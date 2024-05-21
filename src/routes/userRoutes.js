const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const guestMiddleware = require('../middlewares/guestMiddleware');
const rememberUserMiddleware = require('../middlewares/rememberUserMiddleware');
const {inputsValues, validationErrors} = require('../middlewares/validateRegister');
const upload =  require('../middlewares/userAvatar');
const {inputsValuesLogin, validationErrorsLogin} = require('../middlewares/validateLogin');

// router.get('/',rememberUserMiddleware ,userController.index); no necesaria - esta en productosRoutes
router.get('/search', userController.search);
router.get('/login', userController.renderLogin);
router.get('/register/', userController.createUser);
router.post('/register', upload.single('img'),inputsValues, validationErrors ,userController.storeUser);
router.post('/login',inputsValuesLogin, validationErrorsLogin,userController.loginProcess)
router.post('/user/:email',userController.logOut)
router.get('/user/:email',rememberUserMiddleware,guestMiddleware,userController.renderProfile);
router.get('/userDetail/',rememberUserMiddleware,guestMiddleware,userController.renderDetail);
router.get('/editUser/',rememberUserMiddleware,guestMiddleware,userController.renderEdit);
router.put('/editUser/',rememberUserMiddleware,guestMiddleware,upload.single('img'),userController.renderUpdate);
router.get('/editUserPass/',rememberUserMiddleware,guestMiddleware,userController.renderEditPass);
router.put('/editUserPass/',rememberUserMiddleware,guestMiddleware,userController.renderUpdatePass);
router.get('/userList/',rememberUserMiddleware,guestMiddleware,userController.renderList);
router.put('/userListUp/:id',rememberUserMiddleware,guestMiddleware,userController.renderListUpdateUp);
router.put('/userListDown/:id',rememberUserMiddleware,guestMiddleware,userController.renderListUpdateDown);

module.exports = router;