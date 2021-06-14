const {Card}= require('./resources/card/card.model')

const oneCard = async (req, res) => {
    try{
        res.render('sub-layout.pug',{   //Render template index and send the parameters of title of card1 and card2.
        title:'CatanCards'})
    }catch(err){
        res.render('error.pug')
    }
}
module.exports={
    oneCard
}