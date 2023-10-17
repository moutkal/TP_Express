const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/user')

exports.getBooks = (req, res) => {
	if (req.isAuthenticated()) {
	  const books = ['Book 1', 'Book 2', 'Book 3'];
	  res.render('books', { books });
	} else {
	  res.redirect('/');
	}
  };
  