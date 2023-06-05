const mongoose = require('mongoose')

async function main() {
    await mongoose.connect('mongodb+srv://filipe:aFLpU7GXWsi4qzbQ@cluster0.tnnqtsb.mongodb.net/serviceInfo?retryWrites=true&w=majority')
    console.log('Conectado ao Banco!')
}

main().catch((err) => console.log(err))

module.exports = mongoose





//senha banco: aFLpU7GXWsi4qzbQ