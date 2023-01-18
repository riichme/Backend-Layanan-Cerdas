const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController.js')
const {authentication} = require("../middlewares/auth.js")
const productRouter = require('./productRouter')
const userDetailRouter = require('./userRouter')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', UserController.registerUser)

router.post('/login', UserController.loginUser)
router.post('/forgot-password', UserController.forgotPassword)

router.use(authentication)
router.use('/product', productRouter)
router.use('/user-detail', userDetailRouter)

module.exports = router;
