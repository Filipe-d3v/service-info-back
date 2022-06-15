const mongoose = require('../db/conn')
const { Schema } = mongoose

const Product = mongoose.Types({
}
    
)

const CashSale = mongoose.model(
    'CashSale',
    new Schema({
        date: {
            type: Date,
            required: true
        },
        total: {
            type: Number,
            required: true
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