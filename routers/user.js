const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const bookCtrl = require('../controllers/books');

router.get('/', (req, res) => {
	res.render('login');
  });
  
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/books', bookCtrl.getBooks);
router.get('/signup', (req, res) => {
	res.render('signup');
  });

module.exports = router;

