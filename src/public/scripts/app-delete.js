const formato = document.querySelector('#form')
formato.addEventListener('submit', (evento)=>{
    evento.preventDefault()
    const data1=new FormData(formato)
    const id = data1.get('id')
    const person = {
        id:id
        }
    fetch('/v1/cards/delete',{
        method:'POST',
        body:JSON.stringify(person),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(function (res){
        return res.text();
    }).then(function (text){
        window.location.replace('/')

    }).catch(function (error){
        console.log(error)
    })
})