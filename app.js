const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
const User = require('./models/user');
const userRoutes = require('./routers/user');
const bcrypt = require('bcrypt');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/db_User')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: 'mysecret', resave: false, saveUninitialized: false }));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(
	{ usernameField: 'email' },
	async (email, password, done) => {
	  try {
		const user = await User.findOne({ email });
		if (!user) {
		  return done(null, false, { message: 'Unknown user' });
		}
  
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
		  return done(null, false, { message: 'Invalid password' });
		}
		
		return done(null, user);
	  } catch (err) {
		return done(err);
	  }
	}
  ));
  

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id)
	  .then((user) => {
		done(null, user);
	  })
	  .catch((err) => {
		done(err, null);
	  });
  });

app.use(express.urlencoded({ extended: true }));

app.use('/', userRoutes);

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
