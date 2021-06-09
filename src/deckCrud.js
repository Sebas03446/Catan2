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