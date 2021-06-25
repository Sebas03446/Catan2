const card = document.querySelector('.thecard');

card.addEventListener('mouseover', function () {
    card.style.cssText = 'transform: rotateY(180deg);'
    console.log("El mouse esta sobre el botón");
})
card.addEventListener('mouseout', function () {
    card.style.cssText = 'transform: rotateY(0deg);'
    console.log("El mouse esta fuera del botón");
})
/*const crud_bottom = document.querySelector('.read')
crud_bottom.addEventListener('click', function(){
    console.log("se ha dado un click")
    //window.location.replace('http://localhost:3000/v1/cards')
})
const create_bottom = document.querySelector('.create')
create_bottom.addEventListener('click', function(){
    console.log("se ha dado un click")
    //window.location.replace('http://localhost:3000/v1/cards/create')
})
const update_bottom = document.querySelector('.update')
update_bottom.addEventListener('click', function(){
    console.log("se ha dado un click")
    //window.location.replace('http://localhost:3000/v1/cards/update')
})
const delete_bottom = document.querySelector('.delete')
delete_bottom.addEventListener('click', function(){
    console.log("se ha dado un click")
    //window.location.replace('http://localhost:3000/v1/cards/delete')
})*/