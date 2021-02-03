const {mysqlx} = require('./mysqlconnection')
const {config} = require('./mysqlconnection')
const {config2} = require('./mysqlconnection')
const {card}= require('./resources/card/card.router')
//INSERT CARD
console.log(card)
const insertCard = (req, res )=> {
    try{
        mysqlx.getSession({ user: config.user , password: config.password})
            .then(session => {
                return session.sql(`SELECT * FROM Catan.cards`)
                    .execute()
                    .then(() => {
                        const table = session.getSchema(config.schema).getTable(config.table);
                        return table.insert('card_description', 'card_number')
                            .values(card.description, card.number)
                            .execute()
                            .then(() => {
                                return session.close();
                                });
                    });
            });
        res.send('Carta insertada');    
    }catch(error){
        console.log(error);
    }
}
module.exports = {
    insertCard: insertCard
    
}