const mongoose = require('../db/conn')
const { Schema } = mongoose

const Product = mongoose.model(
    'Product',
    new Schema({
        name: {
            type: String,
            required: true
        },
        dpt: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required:false
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        image: {
            type: String,
            required: true
        },
    },
    {timestamps: true},
    )
)

module.exports = Product