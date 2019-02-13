const passport = require('passport');

require('./serializers');
require('./localStrategy');

module.exports = (app)  => {
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(function (req,res, next){
    res.locals.user = req.user;
    next();
  })
}
