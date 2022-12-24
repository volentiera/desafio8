const express = require('express')
const morgan = require('morgan');
const routeProducts = require('./routes/productRoutes')
const routeProductsTest = require('./routes/productsTest')
const path = require('path');
const { Server: IOServer } = require('socket.io')
const http = require('http');
const app = express()
const PORT = 8081
const MongoConnnection = require('./config/mongooseConection')
const productsAccsess = new MongoConnnection()
const MongoConnnectionChat = require('./config/mongooseConectionChat')
const chatAccess = new MongoConnnectionChat()
const { normalize, schema, denormalize } = require('normalizr')
const util = require('util')


const httpServer = http.createServer(app)
const io = new IOServer(httpServer)


app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json());


app.use(express.static(__dirname + '/public'))
app.set('views', path.join(__dirname, './public/views'));
app.set('view engine', 'ejs');


app.use(routeProducts)
app.use(routeProductsTest)

app.get('/', (req , res)=>{
    res.redirect('/api/productos')
})
function print(obj){
    console.log(util.inspect(obj, false, null, true))
}
io.on('connection', async (socket) => {
    console.log('New user connected. Socket ID : ', socket.id);

    socket.emit('products', await productsAccsess.getProducts());

    socket.on('update-product', async product => {

    await productsAccsess.insertProduct(product)
    io.sockets.emit('products', await productsAccsess.getProducts());

    })
    
    socket.emit('messages', await chatAccess.getMessages());
    const getAllMessages = await chatAccess.getMessages()
    
    const newGetAllMessages = getAllMessages.map((e,index) => {
        const allMessagesObject ={
            id: index,
            author: e.author,
            text: e.text
        }
    return allMessagesObject
    })
    const chatOriginal = {
        id: 'abc123',
        mensajes: newGetAllMessages
    }
    const schemaAuthor = new schema.Entity('author', {}, {idAttribute: 'email'});
    const schemaMensaje = new schema.Entity('text', { author: schemaAuthor })
    const schemaMensajes = new schema.Entity('posts', {mensajes: [schemaMensaje] })
    const normalizarMensajes = normalize(chatOriginal, schemaMensajes)
    print(normalizarMensajes)
    console.log(JSON.stringify(newGetAllMessages).length)
    console.log(JSON.stringify(normalizarMensajes).length)
    
    const chatDenormalized = denormalize(chatOriginal, normalizarMensajes)
    console.log(JSON.stringify(chatDenormalized).length)
    print(chatDenormalized)
    
    
    socket.on('update-message', async message => {
    await chatAccess.insertMessage(message)
    io.sockets.emit('messages', await chatAccess.getMessages());

    })
    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });

}
);
const server = httpServer.listen(PORT, () =>
    console.log(
        `Server started on PORT http://localhost:${PORT} at ${new Date().toLocaleString()}`
    )
);

server.on('error', (err) =>{
    console.log('Error en el servidor:', err)
})
