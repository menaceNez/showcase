var User = require('../models/user');
var Character = require('../models/character');
var characterService = require('../services/characterService')

async function getCharacters(uID) {
  try {
    let user = await User.findOne({ _id: uID }).populate('characters');
   
    user.characters = user.characters.filter(c => c !== null);
   
    if (!user.characters) {
      return null;
    }

    return user.characters;
  }
  catch (error) {
    console.log("error in getCharacters: ", error);
  }
}

async function getCharacterTemplate(charID) {
  // console.log("Characters all: ", await Character.find({}));
  const characterTemplate = await Character.findOne({ _id: charID });
  return characterTemplate;
}

async function createCharacter(name, className) {
  try {
    console.log("we have created a character: ", name, className);
    let itemObj = {
      stamina: 0,
      strength: 0,
      intellect: 0,
      agility: 0,
      spirit: 0,
      armor: 0,
      dps: 0,
    }
    const chk = await Character.insertOne({ name: name, class: className, stats: itemObj });

    await chk.save();

    return chk;
  }
  catch (err) {
    return err;
  }
}

async function putStats(statsObj, charID) {
  try {
    const chara2 = await Character.findOne({ _id: charID });

    chara2.stats = statsObj.statsObj;
    // console.log("This is th stats obj: ", statsObj.statsObj ,chara2.stats);

    await chara2.save();

    return chara2;
  }
  catch (error) {
    console.log("error in update stats: ", error);
    return null;
  }
}

async function putGearpiece(gearpiece, charid, itemObj) {
  try {
    const chara = await Character.findOne({ _id: charid });

    let slot = gearpiece.invintory_type.toLowerCase();
    // console.log("Issue with shield?: ", slot, gearpiece);
    if (slot === 'one-hand' || slot === 'two-hand') {
      slot = 'onehand';
    }
    else if (slot === 'off hand' || slot === 'shield') {
    // console.log("Issue with shield?: ", slot);
      slot = 'offhand';
    }
    else if (slot === 'shoulder') {
      slot += 's';
    }

    const checkSlot = chara.characterTemplate[`${slot}`];

    if (!checkSlot) {
      console.log("failed: ", checkSlot);
      return undefined;
    }

    const update = chara.characterTemplate[`${slot}`].gearpiece = gearpiece;
    chara.characterTemplate[`${slot}`].gearpiece.stats = itemObj;
    const savedUpdate = await chara.save()
    return savedUpdate.stats;
  }
  catch (error) {
    console.log("Error in putGearpiece: ", error);
    return err;
  }
}

async function deleteAllCharacters(uid) {
  try {

    const user = await User.findOne({ _id: uid });

    let delChar = await Character.deleteMany({_id: { $in: user.characters }});
    console.log("This is deletdCHar: ", delChar);

    user.characters = [];
    await user.save()

    const updatedUser = await User.findOne({_id: uid});

    return updatedUser;
  }
  catch (error) {
    console.log("Error in deleteAllCharacters: ", error);
    return null;
  }
}
module.exports = { getCharacters, createCharacter, deleteAllCharacters, putGearpiece, putStats, getCharacterTemplate };