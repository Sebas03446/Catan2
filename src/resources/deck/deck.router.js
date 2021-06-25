
const express = require('express');
const {genDecks}=require('../../functionDeck');
const {showDeck, insertDeck,updateDeck,deleteDeck,decks_index} = require('../../deckCrud')
const deckRouter = express.Router();



deckRouter
    .route('/decks')
    .get(decks_index)
    .post(genDecks)
    /* .post(insertDeck)
    .put(updateDeck) */
    .delete(deleteDeck)
deckRouter
    .route('/decks/players')
    .get(showDeck)
module.exports = {
    deckRouter : deckRouter
}