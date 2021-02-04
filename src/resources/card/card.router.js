
const express = require('express');
const {insertCard, showCard, updateCard, deleteCard,genCard}=require('../../Crud');
const cardRouter = express.Router();


const mockController = (req, res) => {
    res.json({ message: 'ok' })
    
  }
cardRouter
    .route('/')
    .get(showCard)
    .post(insertCard)
    .put(updateCard)
    .delete(deleteCard)
cardRouter
    .route('/gencards')
    .post(genCard)
module.exports = {
    cardRouter : cardRouter
}