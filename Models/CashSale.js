const mongoose = require('../db/conn')
const { Schema } = mongoose

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
            type: String,
        },
        type_payment: {
            type: String,
            required: false
        },
        user: Object,
    },
    {timestamps: true},
    )
) 

module.exports = CashSale