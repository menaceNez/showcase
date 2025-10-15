var express = require('express');
var router = express.Router();
var gearService = require('../services/gearService');
var characterService = require("../services/characterService");
// endpoint for getting a list of gear peices
router.get('/', async (req, res, next) => {
  try {
    // console.log("received query: ", req.query);
    let { search, className } = req.query;

    const gearpieces = await gearService.queryByName(search, className);
    // console.log(gearpieces);
  // console.log(typeof(resJson), "Json: ", resJson.results.filter((obj) => obj.data));
  // let results = resJson.results;

  return res.status(200).json(gearpieces);
  }
  catch (error) {
    console.log("Error in gearService(): ", error);
  }
});
// endpoint for getting a CharacterTemplate ( in gearRouter bcs charatemplate, it deals with gear)
router.get('/:charID', async (req,res,next) => {
  const charID = req.params.charID;
  const char = await characterService.getCharacterTemplate(charID);

  if(!char) {
    res.status(500).json({error: "failed to find character"});
  }
  // console.log("giving back char stats: ", char.stats);
  return res.status(200).json({template: char.characterTemplate, stats: char.stats});

});
// updates total stats for a character
router.put('/:id/stats', async (req,res,next) => {
  const charaID = req.params.id;
  let statsObj = await req.body;

  const ret = await characterService.putStats(statsObj, charaID);
  // console.log("giving back stats: ", ret.stats);
  return res.status(200).json(ret.stats);
});

// endpoint to update a characters CharaterTemplate gearpiece also gives back the items stats for fontend to display
router.put('/:id', async (req,res,next) => {
  // body should have gearpiece, and query param could have the gear slot name
  const itemID = req.params.id;

  if(!req.user) {
    return res.status(500).json({error: 'Missing user session'});
  }

  const resp = await req.body;

  const value = await gearService.queryItemStats(itemID);  
  // console.log("queryItem stats ret: ", value.preview_item.stats, value.preview_item.armor);
  const stats = value.preview_item.stats;
  const armor = value.preview_item.armor;
  const weapon = value.preview_item.weapon;
  // give the data back as statname: value

  let itemObj = {
    stamina: 0,
    strength: 0,
    intellect: 0,
    agility: 0,
    spirit: 0,
    armor: 0,
    dps: 0,
  }

  if(stats) {
    for(let stat of stats) {
      let sp = stat.type.name.toLowerCase();
      let exist = itemObj[`${sp}`] === 0;

      if(exist) {
        itemObj[`${sp}`] = stat.value;
      }
    }
  }

  if(weapon) {
      if(weapon.dps.value) {itemObj.dps = weapon.dps.value;}
  }

  if(armor) {
    if(armor.value) {itemObj.armor = armor.value;}
  }

  const ret = await characterService.putGearpiece(resp.gearpiece, resp.charID, itemObj);
  if(ret === undefined) {
    return res.status(204).json({error: "No applicable gearslot"});
  }

  return res.status(200).json(itemObj);
});

module.exports = router