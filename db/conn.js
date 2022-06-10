const mongoose = require('mongoose')

async function main() {
    await mongoose.connect('mongodb+srv://Filipe:of5b2gIIO6jYfXKQ@serviceinfo.2uvff67.mongodb.net/?retryWrites=true&w=majority')
    console.log('Conectado ao Atlas!')
}

main().catch((err) => console.log(err))

module.exports = mongoose





//senha banco: of5b2gIIO6jYfXKQ