const mongoose = require('../db/conn')
const { Schema } = mongoose

const ForwardSale = mongoose.model(
    'ForwardSale',
    new Schema({
        date: {
            type: String,
            required: true
        },
        total: {
            type: Number,
            required: true
        },
        clientName: {
            type: String,
            required: true
        },
        clientAdress: {
            type: String,
            required: true
        },
        clientCPF: {
            type: String,
            required: true
        },
        clientPhone: {
            type: String,
            required: false
        },
        products: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        }],
        status: {
            type: Boolean,
            required: true,
            default: false
        },
        user: Object,
        
    },
    {timestamps: true},
    )
)

module.exports = ForwardSale