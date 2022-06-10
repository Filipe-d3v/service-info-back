const mongoose = require('../db/conn')

const { Schema } = mongoose

const TechnicalService = mongoose.model(
    'TechnicalService',
    new Schema({
        date: {
            type: String,
            required: false
        },
        clientName: {
            type: String,
            required: true
        },
        clientPhone: {
            type: String,
            required: true
        },
        clientAdress: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        value: {
            type: Number,
            required: false
        },
        user: Object,
    },
    {timestamps: true},
    )
)

module.exports = TechnicalService