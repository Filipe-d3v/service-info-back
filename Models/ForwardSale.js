const mongoose = require('../db/conn')
const { Schema } = mongoose

const ForwardSale = mongoose.model(
    'ForwardSale',
    new Schema({
        date: {
            type: Date,
            required: true
        },
        value: {
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
        products: {
            type: Array,
            required: true
        },
        user: Object,
        
    },
    {timestamps: true},
    )
)

module.exports = ForwardSale