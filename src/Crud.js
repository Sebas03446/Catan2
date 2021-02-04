const {mysqlx} = require('./mysqlconnection')
const {config} = require('./mysqlconnection')
const {config2} = require('./mysqlconnection')
const {Card}= require('./resources/card/card.model')
// Mostrar cartas
const showCard = (req, res )=> {
    try{
 
        mysqlx.getSession({ user: config.user , password: config.password})
            .then(session => {
                return session.sql(`SELECT * FROM Catan.cards`)
                    .execute()
                    .then(() => {
                        const table = session.getSchema(config.schema).getTable(config.table);
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

//INSERT CARD
console.log(Card);
const insertCard = (req, res )=> {
    try{
        mysqlx.getSession({ user: config.user , password: config.password})
            .then(session => {
                return session.sql(`SELECT * FROM Catan.cards`)
                    .execute()
                    .then(() => {
                        const table = session.getSchema(config.schema).getTable(config.table);
                        const {number,description} = req.body;
                        const card1 = new Card(description, number);
                        return table.insert('card_description', 'card_number')
                            .values(card1.description, card1.number)
                            .execute()
                            .then(() => {
                                return session.close();
                                });
                    });
            });
        res.send('Guardada exitosamente');
        
    }catch(error){
        console.log(error);
    }
}
//update card--put
const updateCard = (req, res )=> {
    try{
 
        mysqlx.getSession({ user: config.user , password: config.password})
            .then(session => {
                const {card_id , number,description} = req.body;
                console.log(req.body)
                const card1 = new Card(description, number);
                return session.sql(`UPDATE Catan.cards SET card_description = \'${card1.description}\' , card_number = ${card1.number} WHERE card_id = ${card_id};`)
                    .execute()
                    .then(() => {
                                return session.close();
                                });
                    });
           // });
        
         res.send('Se ha actualizado la carta');
    }catch(error){
        console.log(error);
    }
}
//delete card--delete
const deleteCard = (req, res )=> {
    try{
 
        mysqlx.getSession({ user: config.user , password: config.password})
            .then(session => {
                const {card_id } = req.body;
                return session.sql(`DELETE FROM Catan.cards WHERE card_id = ${card_id};`)
                    .execute()
                    .then(() => {
                                return session.close();
                                });
                    });
           // });
        
         res.send('Se ha eliminado la carta');
    }catch(error){
        console.log(error);
    }
}
//Generator 11 cards
const genCard = (req, res )=> {
    try{
        mysqlx.getSession({ user: config.user , password: config.password})
            .then(session => {
                return session.sql(`SELECT * FROM Catan.cards`)
                    .execute()
                    .then(() => {
                        const table = session.getSchema(config.schema).getTable(config.table);
                        return table.insert('card_description', 'card_number')
                            .values("Asalto del ladrón", 7)
                            .values("Epidemia",8)
                            .values("Terremoto",6)
                            .values("Buenos vecinos ",6)
                            .values("Torneo de caballeros",5)
                            .values("Beneficio comercial",5)
                            .values("Mar en calma",9)
                            .values("El ladrón se retira",4)
                            .values("Ayuda vecinal",10)
                            .values("Conflicto",3)
                            .values("Año abundante",2)
                            .execute()
                            .then(() => {
                                return session.close();
                                });
                    });
            });
        res.send('Guardadado exitosamente las 11 cartas');
        
    }catch(error){
        console.log(error);
    }
}
module.exports = {
    insertCard: insertCard,
    showCard:showCard,
    updateCard:updateCard,
    deleteCard:deleteCard,
    genCard:genCard
    
}