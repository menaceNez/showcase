var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Character = require('../models/character');
var bcrypt = require('bcrypt');

async function initUsers() {
  let users = [
    {
      username: "red",
      password: "blue"
    },
    {
      username: "black",
      password: "red"
    },
    {
      username: "green",
      password: "yellow"
    }
  ];

  for (let ele of users) {
    ele.password = await hashThis(ele.password);
  }

  let returned = await User.find({});
  console.log("returned: ", await returned.length);

  if (returned.length === 0) {
    const ret = await User.insertMany(users);
    console.log("INSERTING USERS: ", ret);
  }
  // const ret = await User.deleteMany({});
  // console.log("Deleted paswords: ", ret);
}

async function createCharacters() {
  try {
    let chara = [
      {
        name: 'klob',
        class: 'warrior'
      },
      {
        name: 'jack black',
        class: 'mage'
      },
      {
        name: 'failure',
        class: 'warrior' // was 'warlock' to test enum
      }
    ];

    let charlen = await Character.find({});
    console.log("Charlen: ", charlen);
    if (charlen.length === 0) {
      let ret = await Character.insertMany(chara);
      console.log("Adding Characters: ", ret);
    }
  }
  catch (err) {
    console.log(err);
  }
}

async function addCharactersToUsers() {
  let users = await User.find({});
  let charas = await Character.find({});

  charas.map((val) => {
    users[0].characters.push(val._id);
  });


  console.log(users[0]);
  await users[0].save();
}

async function hashThis(str) {
  return await bcrypt.hash(str, 10);
}

async function verifyHash(str) {
  return await bcrypt.compare(str, ret.password);
}

async function initFiveThousandUsers() {
  let arr = [];
  let uname = "bob";
  let password = "secret"
  for (i = 0; i < 5000; i++) {
    console.log("working...");
    arr.push({
      username: `${uname}${i}`,
      password: await hashThis(`${password}${i}`)
    });
  }
  const ret = await User.insertMany(arr);
  console.log(ret);

}

async function check() {
  const ret = await User.find({});
  console.log(ret);
}
async function removeAll() {
  const ret = await User.deleteMany({});
  console.log(ret);
}

async function updateAllUsers() {
  let users = await User.find({});

  for (let user of users) {
    await user.updateOne({ $set: { isAdmin: false } });
    if (user.username === 'bob0') { 
      console.log("HIT: "); 
      await user.updateOne({ $set: { isAdmin: true } }); 
    }
  }

  users = await User.find({});
  for (let user of users) {
    console.log(user);
  }

}

async function deleteAllCharacters() {
  await User.updateMany({}, {$set: {characters: []}});
  await Character.deleteMany({});
}



module.exports = { router, initUsers, createCharacters, addCharactersToUsers, initFiveThousandUsers, check, removeAll, updateAllUsers, deleteAllCharacters };