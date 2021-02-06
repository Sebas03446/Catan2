
const express = require('express');
const {genDecks}=require('../../functionDeck');
const {showDeck, insertDeck,updateDeck,deleteDeck} = require('../../deckCrud')
const deckRouter = express.Router();



deckRouter
    .route('/decks')
    .get(showDeck)
    /* .post(insertDeck)
    .put(updateDeck) */
    .delete(deleteDeck)

deckRouter
    .route('/gendecks')
    .post(genDecks)
module.exports = {
    deckRouter : deckRouter
}