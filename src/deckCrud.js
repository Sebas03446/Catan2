const { showCard } = require('./Crud')
const {mysqlx, createDatabase} = require('./mysqlconnection')
const {config} = require('./mysqlconnection')
const {config2} = require('./mysqlconnection')
const {Deck} = require('./resources/deck/deck.model') 
// Mostrar barajas
const decks_index =(req, res)=>{
    try{
        res.render('sub-layoutDeck.pug')
    }catch(err){
        res.render('error.pug')
    }
}
const showDeck = async (req, res )=> {
    try{
        session_sql = await mysqlx.getSession({ user: config.user , password: config.password});
        squema = await session_sql.getSchema(config.schema).getTable(config2.table);
        squema_cards = await session_sql.getSchema(config.schema).getTable(config.table).select().execute()
        table = await squema.select().execute()
        cards_players = await table.fetchAll()
        //console.log(cards_players[0])     
        //console.log(cards_players[1])       
        //console.log(cards_players[0])
        //console.log(cards_players[2])
        cards_ = await squema_cards.fetchAll()
        response_cards = []
        for(list_idDecks of cards_players){
            let card_complete = []
            //console.log(list_idDecks)
            for( cards in list_idDecks[1].card_id){
                let value = list_idDecks[1].card_id[cards]
                let data = cards_.find(element => element[0] === value )
                //console.log(data)
                let ca=data
                card_complete.push({card:ca})
            }
            response_cards.push(card_complete)

        }
        //console.log(response_cards)
        //console.log(response_cards[0][1].card[1])
        //res.send('Ver la consola .....');
        res.render('sub-layoutPlayers.pug', {stuffs:response_cards})
    }catch(error){
        res.redirect('/')
        console.log(error);
    }finally{
        //console.log(session_sql.getSchema(config.schema).createCollection())
        session_sql.getSchema(config.schema).dropCollection(config2.table);
        //session_sql.getSchema(config.schema).createCollection('decks',)
        createDatabase()
        return session_sql.close();
    }
}
//delete deck--delete
const deleteDeck = (req, res )=> {
    try{
 
        mysqlx.getSession({ user: config.user , password: config.password})
            .then(session => {
                const {deck_id } = req.body;
                return session.sql(`DELETE FROM Catan.decks WHERE deck_id = ${deck_id};`)
                    .execute()
                    .then(() => {
                                return session.close();
                                });
                    });
           // });
        
         res.send('Se ha eliminado la baraja');
    }catch(error){
        console.log(error);
    }
}
module.exports = {
    showDeck:showDeck,
    /* insertDeck:insertDeck,
    updateDeck:updateDeck, */
    deleteDeck:deleteDeck,
    decks_index
}