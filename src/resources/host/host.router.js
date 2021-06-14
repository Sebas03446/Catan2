const express = require('express');
const {oneCard}=require('../../init');
const hostRouter = express.Router();
hostRouter
    .route('/')
    .get(oneCard)
module.exports={
    hostRouter
}