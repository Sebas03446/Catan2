const { showCard } = require('./Crud')
const {mysqlx} = require('./mysqlconnection')
const {config} = require('./mysqlconnection')
const {config2} = require('./mysqlconnection')
const {Deck} = require('./resources/deck/deck.model') 
// Mostrar barajas
const showDeck = (req, res )=> {
    try{
 
        mysqlx.getSession({ user: config.user , password: config.password})
            .then(session => {
                return session.sql(`SELECT * FROM Catan.decks`)
                    .execute()
                    .then(() => {
                        const table = session.getSchema(config.schema).getTable(config2.table);
                        return table.select()
                            .execute()
                    })
                    .then(res =>{
                          console.log(res.fetchAll()); // Aqui se muestra los datos en la tabla
                    })        
                            .then(() => {
                                return session.close();
                                });
                    });
           // });
        
         res.send('Ver la consola .....');
    }catch(error){
        console.log(error);
    }
}
//INSERT DECK
/* const insertDeck = (req, res )=> {
    try{
        mysqlx.getSession({ user: config.user , password: config.password})
            .then(session => {
                return session.sql(`SELECT * FROM Catan.decks`)
                    .execute()
                    .then(() => {
                        const table = session.getSchema(config.schema).getTable(config2.table);
                        const {card_id,card_id1,card_id2,card_id3,card_id4} = req.body;
                        const deck1 = new Deck(card_id,card_id1,card_id2,card_id3,card_id4);
                        return table.insert('card_id', 'card_id1','card_id2','card_id3','card_id4')
                            .values(deck1.card_id,deck1.card_id1,deck1.card_id2,deck1.card_id3,deck1.card_id4)
                            .execute()
                            .then(() => {
                                return session.close();
                                });
                    });
            });
        res.send('Guardado exitosamente');
        
    }catch(error){
        console.log(error);
    }
} */
//update deck--put
/* const updateDeck = (req, res )=> {
    try{
 
        mysqlx.getSession({ user: config.user , password: config.password})
            .then(session => {
                const {deck_id, card_id,card_id1,card_id2,card_id3,card_id4} = req.body;
                const deck1 = new Deck(card_id,card_id1,card_id2,card_id3,card_id4);
                return session.sql(`UPDATE Catan.decks SET card_id = ${deck1.card_id} , card_id1 = ${deck1.card_id1} ,card_id2 = ${deck1.card_id2} , card_id3 = ${deck1.card_id3} , card_id4 = ${deck1.card_id4}
                 WHERE deck_id = ${deck_id};`)
                    .execute()
                    .then(() => {
                                return session.close();
                                });
                    });
           // });
        
         res.send('Se ha actualizado la baraja');
    }catch(error){
        console.log(error);
    }
} */
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
    deleteDeck:deleteDeck
}