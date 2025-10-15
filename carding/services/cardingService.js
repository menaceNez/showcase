const userService = require('./userService');

function Card(id, name, kind, description, imageUrl, rating) {
    this.id = id;
    this.name = name;
    this.kind = kind;
    this.description = description;
    this.imageUrl = imageUrl;
    this.rating = rating;
}

function Rating ( rating, card, password ) { // will eventually hold password and cardid
   this.rating = rating;
   this.card = card;
   this.password = password;
}
// card object
let CardDb = [];

function addCard(id,name,kind,description,imageUrl) {
    CardDb.push(new Card(id,name,kind,description,imageUrl,new Rating(0,id,null)));
}

function sortCards() {
    CardDb.sort((a,b) => a.name.localeCompare(b.name));
}

function clearCards() {
    CardDb.splice(0, CardDb.length);
}

function getCards() {
    return CardDb;
}

function updateRating(rating, id, username) {
    if(!rating || !id || !username) {
        return false;
    }

    let found = CardDb.find( (card) => id === card.id); 
    let pwd = userService.findUser(username).password;
    found.rating.password = pwd;
    found.rating.rating = rating;

    return true;
}

function getRating(cid) {
    const found = CardDb.find( (card) => cid === card.id);
    if(!found) {
        return null;
    }

    return found.rating.rating;
}

module.exports = { addCard, sortCards, clearCards, getCards, updateRating, getRating }
