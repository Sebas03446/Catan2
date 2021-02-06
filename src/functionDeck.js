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
                        
                        //console.log(sizelistCard, listCard_id)
                        listCard_id.sort(function(){return Math.random()-0.5}); 
                        searchSessionDecks(listCard_id,sizelistCard);
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
const searchSessionDecks=(listCard_id,sizelistCard)=>{
    let entryTable=0;
    for(let i=0;i<sizelistCard;i++){
        entryTable++;
        if(entryTable==5){
            entryTable=0;
            mysqlx.getSession({ user: config.user , password: config.password})
            .then(session => {
                return session.sql(`SELECT * FROM Catan.decks`)
                    .execute()
                    .then(() => {
                        const table = session.getSchema(config.schema).getTable(config2.table);
                        return table.insert('card_id', 'card_id1','card_id2','card_id3','card_id4')
                        .values(listCard_id[i-4],listCard_id[i-3],listCard_id[i-2],listCard_id[i-1],listCard_id[i])
                        .execute()
                            .then(() => {
                                return session.close();
                                });
                    });
            });
            
        }

            
    }

}
module.exports = {
    genDecks:genDecks
}
