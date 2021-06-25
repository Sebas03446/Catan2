const {mysqlx} = require('./mysqlconnection')
const {config} = require('./mysqlconnection')
const {config2} = require('./mysqlconnection')
var fs = require('fs');
const { json } = require('body-parser');
const path = require('path');

// Generator of decks

const genDecks = async (req, res)=>{
    try{
        session_sql = await mysqlx.getSession({ user: config.user , password: config.password});
        cards_squema = await session_sql.sql(`SELECT card_id FROM Catan.cards;`).execute();
        listCard_id = await cards_squema.fetchAll();
        const sizelistCard = listCard_id.length;
        listCard_id.sort(function(){return Math.random()-0.5}); 
        const {players}=req.body;
        const num_cards= parseInt(sizelistCard/players);
        await searchSessionDecks(listCard_id,players,num_cards);
        res.redirect('/v1/decks/players')
        
    }catch(error){
        console.log('errorr')
        res.redirect('/')
    }finally{
        return session_sql.close()
    }

} 
const searchSessionDecks= async (listCard_id,players, num_cards)=>{
    let entryTable=0;
    let countPlayers=0;
    /*console.log(num_cards)
    function loadJSON (filename=''){
        return fs.existsSync(filename) ? fs.readFileSync(filename).toString() : 'null';
        
    }
    function saveJSON(filename='', json='""'){
        return fs.writeFileSync(filename,JSON.stringify(json))
    }*/
    const baseJson={
        "card_id":[]
    }
    //var data = JSON.parse(loadJSON('./src/data.json'));
    var data={
        "card_id":[]
    }
    for(card of listCard_id){
        entryTable++;
        data.card_id.push(JSON.parse(card))
        if(entryTable==num_cards && countPlayers!=players){
            entryTable=0;
            session_sql = await mysqlx.getSession({ user: config.user , password: config.password});
            cards_squema = await session_sql.getSchema(config.schema).getTable(config2.table);
            await cards_squema.insert('card_id').values(data).execute();
            data={
                "card_id":[]
            }
            countPlayers++;
        }

    }

}
module.exports = {
    genDecks:genDecks
}
