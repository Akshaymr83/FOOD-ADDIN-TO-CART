const express = require('express');
// const router = express.Router();
const port=9000;
const app=express()
const cors=require('cors')
const mongoose=require('mongoose')
const FoodModel = require('./model/FoodModel');
const Cart = require('../server/model/cartModel'); 


mongoose.connect('mongodb://localhost:27017/FOODies')
.then(()=>{
    console.log('mongoose is connected');
})
.catch((err)=>{
    console.log(err);

})
  app.use(express.json())  
app.use(cors())


// Create a new food item
app.post('/food', async (req, res) => {
    try {
        const { foodname, image, category, description, price } = req.body;
        const newFood = new FoodModel({ foodname, image, category, description, price });
        const savedFood = await newFood.save();
        res.status(201).json(savedFood);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.get('/getfood', async (req, res) => {
    try {
        const foods = await FoodModel.find();
        res.json(foods);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.put('/updatefood/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { foodname, image, category, description, price } = req.body;
        const updatedFood = await FoodModel.findByIdAndUpdate(id, { foodname, image, category, description, price }, { new: true });
        res.json(updatedFood);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete('/deletefood/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await FoodModel.findByIdAndDelete(id);
        res.json({ message: 'Food item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Server-side code
app.post('/addToNewSchema', async (req, res) => {
    try {
        const foodData = req.body;
        // Save the food item to the new schema (Cart)
        const cartItem = new Cart(foodData);
        await cartItem.save();
        res.status(201).send({ message: 'Item added to cart successfully.' });
    } catch (err) {
        console.error('Error adding item to cart:', err);
        res.status(500).json({ message: 'Failed to add item to cart. Please try again.' });
    }
});


app.get('/cartData', async (req, res) => {
    try {
        const cartData = await Cart.find();
        res.json(cartData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
app.post('/addToCart', async (req, res) => {
    try {
      const cartItem = new Cart(req.body);
      await cartItem.save();
      res.status(201).json({ message: 'Item added to cart successfully' });
    } catch (error) {
      console.error('Error adding item to cart:', error);
      res.status(500).json({ message: 'Failed to add item to cart' });
    }
  });
app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})