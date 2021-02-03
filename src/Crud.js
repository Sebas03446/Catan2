const {mysqlx} = require('./mysqlconnection')
const {config} = require('./mysqlconnection')
const {config2} = require('./mysqlconnection')
const {Card}= require('./resources/card/card.model')
//INSERT CARD
console.log(Card);
const card1 = new Card('prueba',15);
const insertCard = (req, res )=> {
    try{
        mysqlx.getSession({ user: config.user , password: config.password})
            .then(session => {
                return session.sql(`SELECT * FROM Catan.cards`)
                    .execute()
                    .then(() => {
                        const table = session.getSchema(config.schema).getTable(config.table);
                        return table.insert('card_description', 'card_number')
                            .values(card1.description, card1.number)
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