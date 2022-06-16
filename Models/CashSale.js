const mongoose = require('../db/conn')
const { Schema } = mongoose

const Product = Schema({ name: String, price: Number})

const CashSale = mongoose.model(
    'CashSale',
    new Schema({
        date: {
            type: Date,
            required: true
        },
        total: {
            type: Number,
            required: false
        },
        products: {
            type: [Product],
            required: true
        },
        type_payment: {
            type: String,
            required: true
        },
        user: Object,
    },
    {timestamps: true},
    )
)

module.exports = CashSale