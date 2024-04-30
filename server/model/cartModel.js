const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    foodname: String,
    image: String,
    category: String,
    description: String,
    price: Number
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
