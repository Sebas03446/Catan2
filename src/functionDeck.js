const {mysqlx} = require('./mysqlconnection')
const {config} = require('./mysqlconnection')
const {config2} = require('./mysqlconnection')

// Generator of decks
const genDecks = (req, res )=> {
    try{
 
        mysqlx.getSession({ user: config.user , password: config.password})
            .then(session => {
                return session.sql(`SELECT card_id FROM Catan.cards;`)
                    .execute()
                    .then(res =>{
                        const listCard_id = res.fetchAll();
                        const sizelistCard = listCard_id.length;
                        console.log(size, listCard_id)
                        listCard_id=listCard_id.prototype.sort();
                         for(let i=0;i<sizelistCard;i++){
                            console.log(listCard_id[i]);
                        } 

                    })
                    .then(() => {
                                return session.close();
                                });
                    });
           // });
        
         res.send('Se ha creado la baraja');
    }catch(error){
        console.log(error);
    }
}
module.exports = {
    genDecks:genDecks
}
