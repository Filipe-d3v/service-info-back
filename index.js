const express = require('express')
const cors = require('cors')

const app = express()

//JSON response
app.use(express.json())

//Resolver Cors
//app.use(cors("Access-Control-Allow-Origin", "*"))

app.use(express.static('public'))

//Rotas
const userRoutes = require('./routes/UserRoutes')
const productRoutes = require('./routes/ProductRoutes')
const technicalServiceRoutes = require('./routes/TechnicalServiceRoutes')
const cashSaleRoutes = require('./routes/CashSaleRoutes')
const forwardSaleRoutes = require('./routes/ForwardSaleRoutes')

app.use('/users', userRoutes)
app.use('/products', productRoutes)
app.use('/techservices', technicalServiceRoutes)
app.use('/cashsales', cashSaleRoutes)
app.use('/forwardsales', forwardSaleRoutes)

app.listen(5050)