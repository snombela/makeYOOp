const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User          = require('../models/User');
const bcrypt        = require('bcrypt');
const Brand         = require('../models/Brand')

passport.use(new LocalStrategy({
    roleField: 'role',
    usernameField: 'email',
    passwordField: 'password'
  }, 
  (role, email, password, done) => {
    console.log("dentro")
    
      User.findOne({ email })
      .then(foundUser => {
        //si ha encontrado el Usuario 
        if (!foundUser) {
          done(null, false, { message: 'Incorrect email' });
          return;
        }
        if (!bcrypt.compareSync(password, foundUser.password)) {
          done(null, false, { message: 'Incorrect password' });
          return;
        }
        done(null, foundUser);
      })
      .catch(err => done(err));
    
      Brand.findOne({ email })
      .then(foundBrand => {
        if (!foundBrand) {
          done(null, false, { message: 'Incorrect email' });
          return;
        }
        if (!bcrypt.compareSync(password, foundBrand.password)) {
          done(null, false, { message: 'Incorrect password' });
          return;
        }
        done(null, foundBrand);
      })
  }

  //Dentro del then metemos brand








));
