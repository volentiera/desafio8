
const {Router} = require('express');
const router = Router();

const faker = require('faker')



const products = []


router.get('/api/productos-test', async (req, res) => {
    for (let index = 0; index < 5; index++) {
        const product = {nombre: faker.commerce.productName(), precio: faker.commerce.price(100, 2000), foto: faker.image.fashion()}
        products.push(product)
    }
    res.json(products)
});




module.exports = router;