
const {Router} = require('express');
const router = Router();

const MongoConnnection = require('../config/mongooseConection')
const productsAccess = new MongoConnnection()
const MongoConnnectionChat = require('../config/mongooseConectionChat')
const chatAccess = new MongoConnnectionChat()
const jsScript = 'public/main.js';





router.get('/api/productos', async (req, res) => {
    const products = await productsAccess.getProducts()
    const messages = await chatAccess.getMessages()
    res.render('index', { products, messages, jsScript });
});




module.exports = router;