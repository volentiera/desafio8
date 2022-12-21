const mongoose = require('mongoose')
const ProductsDAO = require('../controllers/products')

class MongoConnnection extends ProductsDAO{
    
    async connect(){
        await mongoose.connect('mongodb://localhost:27017/ecommerce', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000
    })
    }
}
module.exports = MongoConnnection