const mongoose = require('mongoose')
const { Schema } = mongoose

const productsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

class ProductsDAO{
    productsDAO = mongoose.model('products', productsSchema)
    async getProducts(){
        try {
            this.connect()
            const allCarts = await this.productsDAO.find()
            return allCarts
        } catch (error) {
            console.log(error)
        }
    }
    async insertProduct(product){
        try {
            this.connect()
            await this.productsDAO.create(product)
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = ProductsDAO