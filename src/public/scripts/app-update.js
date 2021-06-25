/*const formato = document.querySelector('#form')
formato.addEventListener('submit', (evento)=>{
    evento.preventDefault()
    const data1=new FormData(formato)
    const id = data1.get('id')
    const number =data1.get('number')
    const description =data1.get('description')
    console.log(number, description)
    const person = {
        id:id,
        number:number,
        description:`${description}`
        }
    fetch('/v1/cards/create',{
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
})*/