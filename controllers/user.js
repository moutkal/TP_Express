const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/user')

exports.login = passport.authenticate('local', {
	

	successRedirect: '/books',
	failureRedirect: '/',
	failureFlash: true,
  });
  

  
 

exports.signup = async (req, res, next) => {
	try {
	  const { email, password } = req.body;
  
	  if (!email || !password) {
		return res.status(400).send('Champs manquants');
	  }
  
	  const hashedPassword = await bcrypt.hash(password, 10);
  
	  const user = new User({
		email,
		password: hashedPassword
	  });
  
	  await user.save();
  	  res.redirect('/');
	} catch (error) {
	  console.error(error);
	  res.redirect('/signup');
	}
  };
  
