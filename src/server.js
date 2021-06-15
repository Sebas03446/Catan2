const express = require('express');
const bodyParser=require('body-parser')
const {cardRouter} = require('./resources/card/card.router')
const {deckRouter}=require('./resources/deck/deck.router')
const {hostRouter}=require('./resources/host/host.router')
const {mysqlx} = require('./mysqlconnection')
const {genCard} = require('./Crud')
const app = express();
const port = 3000;
const path = require('path')
//Route static elements
app.use(express.static('src/public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//Configuration template engine pug
app.set('views', path.join(__dirname,'/views'))
app.set('view engine', 'pug')
//routes
app.use('/',genCard,hostRouter)
app.use('/v1',cardRouter)
app.use('/v1',deckRouter)
//server start
function start(){
  try{  
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  }) 
  }catch(error){
      console.log(error);
  }
}
module.exports = {
  start:start
}

