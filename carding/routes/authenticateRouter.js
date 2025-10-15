var express = require('express');
const usersService = require('../services/userService');
const cardingService = require('../services/cardingService');
var router = express.Router();

router.post('/login', function(req, res, next) {
    const uname = req.body.uname;
    const pswd = req.body.pswd;
    const auth = usersService.validateUser(uname, pswd);

    if (auth) {
        return res
        .status(200)
        .set('X-Token', `${auth.id}`)
        .send();  
    }

    return res.status(400).send();
});

router.get('/logout', function(req, res, next) {
    delete req.headers['x-token'];

    cardingService.clearCards();

    return res
    .status(200)
    .send(); 
});

module.exports = router;