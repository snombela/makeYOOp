const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const Brand = require("../models/Brand");
const bcrypt = require("bcrypt");

passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    function(email, password, done) {
      console.log("dentro");

      User.findOne({email})
      .then(user => {
        if(!user) {
          return Brand.findOne({email})
        } else {
          if (!bcrypt.compareSync(password, user.password)) {
            done(null, false, { message: "Incorrect user password" });
            return;
          } else {
            done(null, user);
          }
        }
      })
      .then(brand => {
        if(!brand) {
          done(null, false, { message: "Incorrect brand password" });
          return;
        } else {
          done(null, brand);
        }
      })
      .catch(err => done(err));

    }
  )
);

