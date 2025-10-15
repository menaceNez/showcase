var express = require('express');
var router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;
var retToken = require('../services/bnet_server_tok');
var hasher = require('../services/hashService');


var init = require('../services/initUsers');
// init.initUsers();
// init.createCharacters();
// init.addCharactersToUsers();
// init.initFiveThousandUsers();
// init.check();
// init.removeAll();
// init.updateAllUsers();
// init.deleteAllCharacters();

passport.use(new LocalStrategy(
  async (username, password, cb) => {
    const user = await User.findOne({ username });

    if (!user) {
      return cb(null, false, { message: 'Incorrect credentials' }); // invalid login, user returned throws a 401 unauthenticated falsy
    } 

    let verify = await hasher.verifyPassword(password, user.password);
    // console.log("HASHED COMPARE OUTPUT: ", verify);

    if (verify) { 
      return cb(null, user); // successfully found and authenticated a user
    } else {
      return cb(null, false, { message: 'Incorrect credentials' }); // sends a 401 response as a catch all but if mongo throws an error it should be reported here
    }
  }
));

/*
passport -> authenticate('local', {...}) -> LocalStrategy -> serializeUser
*/

passport.serializeUser((user, done) => { // called after authenticate middlewear
  // console.log(`serialize user (${user})`);
  process.nextTick(function() {
    done(null, user._id); // stores the user._id in memory by default
  });
});

passport.deserializeUser(async (_id, done) => { // called on every request
  // console.log(`deserialize user (${_id})`);
  const user = await User.findOne({ _id });
  if (user) {
    done(null, user);
  } else {
    done(new Error('User not found'));
  }
});

router.post('/login',
  passport.authenticate('local', {
    failureMessage: true
  }),
  async (req, res) => {

    res.json(req.user.username); // give the user the username to store 
  }
);

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    console.log("Loggin out: ", req.user);
    return res.json({ message: 'Logged out successfully' });
  });
});

module.exports = router;