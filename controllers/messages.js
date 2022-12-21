const mongoose = require('mongoose')
const { Schema } = mongoose

const messagesSchema = new Schema({
    author: {
        type: Object,
        required: true
    },
    text: {
        type: String,
        required: true
    }
})

class MessagesDAO{
    messagesDAO = mongoose.model('messages', messagesSchema)
    async getMessages(){
        try {
            this.connect()
            const allMessages = await this.messagesDAO.find()
            return allMessages
        } catch (error) {
            console.log(error)
        }
    }
    async insertMessage(message){
        try {
            this.connect()
            await this.messagesDAO.create(message)
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = MessagesDAO