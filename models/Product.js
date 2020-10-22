const mongoose = require('mongoose');
const {nanoid} = require('nanoid');

const Product = new mongoose.Schema({

    _id : {
        type: String,
        default: () => nanoid()
    },
    title : {
        type: String
    },
    description : {
        type: String
    },
    image : {
        type: String
    },
    availableSizes: {
        type: [String]
    },
    price : {
        type: Number
    }
})

module.exports = mongoose.model("Product", Product);