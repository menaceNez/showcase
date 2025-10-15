var express = require('express');

var cardingService = require('../services/cardingService');

var router = express.Router();

router.get('/api/v1/cards', async (req, res, next) => {
    const search = req.query.search;
    cardingService.clearCards(); // clear cards at the start of each search
    let cardArray_json = [];

    await fetch(`https://api.scryfall.com/cards/search?q=${search}&order=name`)
    .then((cards) => {if(cards.ok) {return cards.json();} else {return null}})
    .then((cards) => {
        // json card object
        // let arr = Array.from(cards.data);
        if(cards) {
            for (const card of cards.data) {
                if(card.image_uris !== undefined) {
                    let id = card.id;
                    let name = card.name;
                    let description = card.oracle_text;
                    let imageuri = card.image_uris.normal;
            
                    cardingService.addCard(id, name, 'MTG', description, imageuri);
                }
            }
        }
    }).catch( (err) => console.log(err));

    await fetch(`https://api.pokemontcg.io/v2/cards?q=name:${search}*&orderBy=name`)
    .then((res) => {if(res.ok) {return res.json()} else {return null}})
    .then((cards) => {
        if(cards) {
            for (const card of cards.data) {
                if(card.images.large !== undefined) {
                    let id = card.id;
                    let name = card.name
                    let desc = card.flavorText;
                    let imguri = card.images.large;

                    cardingService.addCard(id, name, 'POKEMON', desc, imguri);
                }
            }
        }
    }).catch((err) => console.log(err));

    cardingService.sortCards();
    cardArray_json = JSON.stringify(cardingService.getCards());
    return res.status(200).send(cardArray_json);   // .catch((err) => {return res.status(400).send()});
});

router.post('/api/v1/cards/:cardid/rating', (req, res, next) => {
    // add a rating 
    let cardId = req.params.cardid;
    let userRating = req.query.rating;
    let username = req.query.user;

    cardingService.updateRating(userRating, cardId, username);

    return res.status(200).send();
});

router.get('/api/v1/cards/:cardid/rating', (req, res, next) => {
    const cardId = req.params.cardid;

    // return the rating for the card
    let ret = cardingService.getRating(cardId);

    if(ret === null) {
        return res.status(400).send();
    }
    ret = String(ret);

    return res.status(200).send(ret);
});

module.exports = router;