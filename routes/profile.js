const express = require("express");
const router = express.Router();

router.get("/profile", ensureAuthenticated, (req, res) => {
    res.render("profile/profile", {"user": req.user});
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login')
  }
}

module.exports = router;
