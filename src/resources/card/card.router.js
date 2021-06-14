const express = require('express');
const {insertCardget,insertCard, showCard, updateCard,updateCardget, deleteCard,deleteCardget,genCard,showMenu}=require('../../Crud');
const cardRouter = express.Router();
cardRouter
    .route('/')
    .get(showMenu)
cardRouter
    .route('/gencards')
    .post(genCard)
cardRouter
    .route('/cards')
    .get(showCard)
    .post(insertCard)
    .delete(deleteCard)
cardRouter
    .route('/cards/create')
    .get(insertCardget)
    .post(insertCard)
cardRouter
    .route('/cards/update')
    .get(updateCardget)
    .post(updateCard)
cardRouter
    .route('/cards/delete')
    .get(deleteCardget)
    .post(deleteCard)
module.exports = {
    cardRouter : cardRouter
}