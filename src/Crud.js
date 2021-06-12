const {mysqlx} = require('./mysqlconnection')
const {config} = require('./mysqlconnection')
const {config2} = require('./mysqlconnection')
const {Card}= require('./resources/card/card.model')

// Mostrar cartas
const showCard = async (req, res) => {
    const session_sql = await mysqlx.getSession({ user: config.user , password: config.password});
    const session_squema = await session_sql.sql(`SELECT * FROM Catan.cards`).execute();
    const listCards = session_squema.fetchAll();
    try{
        res.render('index.pug',{   //Render template index and send the parameters of title of card1 and card2.
        title:listCards[0][1],
        title2:listCards[1][1]})
    }catch(err){
        res.render('error.pug')
    }
    session_sql.close()
}
//INSERT CARD
const insertCard = async (req, res) =>{
    const session_sql = await mysqlx.getSession({ user: config.user , password: config.password});
    const session_squema = await session_sql.getSchema(config.schema).getTable(config.table);
    const {number,description} = req.body;
    const card1 = new Card(description, number);
    try{
        session_squema.insert('card_description', 'card_number').values(card1.description, card1.number).execute();
        res.send('Guardada exitosamente');
    }catch(err){
        res.send('NO, se ha guardado la carta')
    }
    session_sql.close();
}
//update card--put
const updateCard = async (req, res)=>{
    const session_sql = await mysqlx.getSession({ user: config.user , password: config.password})
    const {card_id , number,description} = req.body;
    console.log(req.body)
    const card1 = new Card(description, number);
    session_sql.sql(`UPDATE Catan.cards SET card_description = \'${card1.description}\' , card_number = ${card1.number} WHERE card_id = ${card_id};`).execute()
    session_sql.close()
    res.send('Se ha actualizado la carta')
}
//delete card--delete
const deleteCard = async (req,res) =>{
    const session_sql = await mysqlx.getSession({ user: config.user , password: config.password});
    const {card_id } = req.body;
    session_sql.sql(`DELETE FROM Catan.cards WHERE card_id = ${card_id};`).execute()
    session_sql.close()
    res.send('Se ha eliminado la carta')
}
//Generator 11 cards
const genCard =async (req,res)=>{
    const session_sql = await mysqlx.getSession({ user: config.user , password: config.password});
    const table = session_sql.getSchema(config.schema).getTable(config.table);
    table.insert('card_description', 'card_number')
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
    session_sql.close()
    res.send('Guardadado exitosamente las 11 cartas');

}
module.exports = {
    insertCard: insertCard,
    showCard:showCard,
    updateCard:updateCard,
    deleteCard:deleteCard,
    genCard:genCard
    
}

                        //res.sendFile("/public/index.pug",{root: __dirname }) sentencia para enviar archivos