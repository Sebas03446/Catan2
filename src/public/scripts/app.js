const card = document.querySelector('.thecard');

card.addEventListener('mouseover', function () {
    card.style.cssText = 'transform: rotateY(180deg);'
    console.log("El mouse esta sobre el botón");
})
card.addEventListener('mouseout', function () {
    card.style.cssText = 'transform: rotateY(0deg);'
    console.log("El mouse esta fuera del botón");
})
/* const card2 = document.querySelector('.thecard2');

card2.addEventListener('mouseover', function () {
    card2.style.cssText = 'transform: rotateY(180deg);'
    console.log("El mouse esta sobre el botón");
})
card2.addEventListener('mouseout', function () {
    card2.style.cssText = 'transform: rotateY(0deg);'
    console.log("El mouse esta fuera del botón");
}) */
const crud_bottom = document.querySelector('.crud')
crud_bottom.addEventListener('click', function(){
    console.log("se ha dado un click")
})
const deck_bottom = document.querySelector('.decks')
deck_bottom.addEventListener('click', function(){
    console.log("se ha dado un click")

})