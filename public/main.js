const socket = io()

const div = document.getElementById('messages')
const btn = document.getElementById('enviar')
const inputId = document.getElementById('id')
const inputApellido = document.getElementById('apellido')
const inputAlias = document.getElementById('alias')
const inputEdad = document.getElementById('edad')
const inputAvatar = document.getElementById('avatar')
const inputNombre = document.getElementById('nombre')
const inputTexto = document.getElementById('texto')
const divList = document.getElementById('divList')
const btnProd = document.getElementById('btnProd')
const inputName = document.getElementById('name')
const inputPrice = document.getElementById('price')
const inputImage = document.getElementById('image')

btnProd.addEventListener('click', (e) => {
    e.preventDefault()
    const name = inputName.value
    const price = inputPrice.value
    const image = inputImage.value
    socket.emit('update-product', {
        name: name,
        price: price,
        image: image
    });
});

socket.on('products',(products)=>{
    divList.innerHTML = products.map(product =>{
        return (`
            <div class="card" style="width: 250px; margin: 30px">
            <div class="card-image" style="padding: 15px">
                <figure class="image is-4by3">
                    <img src="${product.image}" alt="Placeholder image" />
                </figure>
            </div>
            <div class="card-content">
                <div class="media">
                    <div class="media-content">
                        <p class="title is-4">${product.name}</p>
                        <p class="subtitle is-6">${product.price}</p>
                    </div>
                </div>
            </div>
        </div>`)
    })
})

btn.addEventListener('click', (e) => {
    e.preventDefault()
    const author = {email: inputId.value, nombre: inputNombre.value, apellido: inputApellido.value, edad: inputEdad.value, alias: inputAlias.value, avatar: inputAvatar.value}
    const texto = inputTexto.value
    socket.emit('update-message', {
        author: author,
        text: texto
    });
});
socket.on('messages', (messages) => {
    div.innerHTML = messages.map(message => {
        if (message.author.id === inputId.value) {
            return `<div class="notification is-link is-light"
                style="text-align: justify; margin-left: 35px;     padding: 15px;
                border-radius: 20px;">
                    <div>
                    <p>${message.text}</p>
                    </div>
                    <div
                        style="text-align: end; font-style: italic; font-weight: 400"
                        class="has-text-dark">
                    ${message.author.nombre} - ${message.author.email}
                    </div>
            </div>`
        } else {
            return `<div
        class="notification is-primary is-light"
        style=" text-align: justify; margin-rigth:35px;     padding: 15px;
        border-radius: 20px;">
            <div>
            <p>${message.text}</p>
            </div>
            <div
            style="text-align: end; font-style: italic; font-weight: 400"
            class="has-text-dark"
            >
            ${message.author.nombre} - ${message.author.email}
            </div>
        </div>`
        }
    }).join("")
})
