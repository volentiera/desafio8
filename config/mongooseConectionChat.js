const mongoose = require('mongoose')
const ChatDAO = require('../controllers/messages')

class MongoConnnection extends ChatDAO{
    
    async connect(){
        await mongoose.connect('mongodb://localhost:27017/ecommerce', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000
    })
    }
}
module.exports = MongoConnnection