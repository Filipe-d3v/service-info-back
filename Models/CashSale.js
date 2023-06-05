const mongoose = require('../db/conn')
const { Schema } = mongoose

const CashSale = mongoose.model(
    'CashSale',
    new Schema({
        date: {
            type: String,
            required: true
        },
        total: {
            type: Number,
            required: false
        },
        products: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        }],
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