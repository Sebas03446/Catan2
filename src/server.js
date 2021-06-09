const express = require('express');
const bodyParser = require('body-parser');
const {cardRouter} = require('./resources/card/card.router')
const {deckRouter}=require('./resources/deck/deck.router')
const {mysqlx} = require('./mysqlconnection')
const app = express();
app.use(bodyParser.json());
const port = 3000;
const path = require('path')
//Route static elements
app.use(express.static('src/public'))
//Configuration template engine pug
app.set('views', path.join(__dirname,'/views'))
app.set('view engine', 'pug')
//routes
app.use('/',cardRouter)
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
/* export const start = () => {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  }) 
} */

