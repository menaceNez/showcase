var express = require('express');
var router = express.Router();

router.use('*', (req,res,next) => {
  console.log("is authed?: ", req.isAuthenticated());
  if(!req.isAuthenticated()) {
    return res.status(401).json({error: 'Unauthorized'});
  }
  next();
});

module.exports = router;