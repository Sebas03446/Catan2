
const express = require('express');
const {insertCard}=require('../../Crud');
const cardRouter = express.Router();


const mockController = (req, res) => {
    res.json({ message: 'ok' })
  }
cardRouter
    .route('/')
    .get(mockController)
    .post(insertCard)

module.exports = {
    cardRouter : cardRouter
}