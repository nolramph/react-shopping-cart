const { json } = require('express');
const express = require('express');
const shortid = require('shortid');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

//Mongoose Schema
const Product = require('./models/Product')

//Load config path
dotenv.config({path: "./config/config.env"});

const app = express();

//Body parser middleware
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Mongodb connect
connectDB();

// const product

/**
 * @desc  Show all products
 * @route GET /api/products
 */
app.get("/api/products", async (req, res) => {
    const products = await Product.find({});
    res.send(products);
})


/**
 * @desc  Add product
 * @route POST /api/products
 */

app.post("/api/products", async (req,res) => {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.send(savedProduct);
})


/**
 * @desc  delete product
 * @route GET /api/products
 */
app.delete("/api/products/:id", async (req,res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.send(deletedProduct);
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))