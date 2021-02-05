
const express = require('express');
const {genDecks}=require('../../functionDeck');
const deckRouter = express.Router();



/* const mockController = (req, res) => {
    res.json({ message: 'ok' })
    
  } */

deckRouter
    .route('/gendecks')
    .post(genDecks)
module.exports = {
    deckRouter : deckRouter
}