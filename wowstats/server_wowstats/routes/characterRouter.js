var express = require('express');
var router = express.Router();
var User = require('../models/user');
var characterService = require('../services/characterService');
var bnetToken = require('../services/bnet_server_tok');


// endpoint for getting all characters for a user
router.get('/', async (req, res, next) => {
  if (!req.user) {
    return res.status(500).send('no res.user');
  }

  try {
    let uID = req.user._id;
    let charArray = await characterService.getCharacters(uID);
    console.log("Check the char array: " , charArray);

    if(charArray === null) { // case where no characters
      return res.status(200).json([]);
    }

    return res.status(201).json(charArray);
  }
  catch (err) {
    console.log(err);
    return res.status(500).send("Server error in getting characters");
  }
});
// endpoint for creating a character
router.post('/', async (req, res, next) => {
  if (!req.user) {
    return res.status(500).json({ errorMessage: "session user not found" });
  }
  
  try {
    const bod = await req.body;

    let user = await User.findOne({ _id: req.user._id });
    const created = await characterService.createCharacter(bod.name, String(bod.class).toLowerCase());

    user.characters.push(created._id);

    await user.save();
    
    return res.status(201).json({_id: created._id});
  }
  catch (err) {
    console.log("Server ran into an error", err);
    return res.status(500).send("Server error in create character");
  }
});

// endpoint for deleting all characters
router.delete('/', async (req,res,next) => {
  if(!req.user) {
    return res.status(500).send("user did not exist from session");
  }
  const del = await characterService.deleteAllCharacters(req.user._id);
  console.log("Deleted: ", del);

  if(!del) {
    return res.status(500).send("failed deleting characters");
  }

  console.log("CHECK: ", await User.findOne({_id: req.user._id}));

  return res.status(200).json({message: "Characters deleted"}); 
});

module.exports = router;