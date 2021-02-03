
const express = require('express');
const {insertCard}=require('../../Crud');
const cardRouter = express.Router();

const card = {
    description: 'ES UNA NUEVA CARTA',
    number: 8
}
const mockController = (req, res) => {
    res.json({ message: 'ok' })
  }
cardRouter
    .route('/')
    .get(mockController)
    .post(insertCard)

module.exports = {
    cardRouter : cardRouter,
    card:card
}