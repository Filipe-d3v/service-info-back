const router = require('express').Router()

const CashSaleController = require('../controllers/CashSaleController')

const verifyToken = require('../helpers/verify-token')

router.post('/create', verifyToken, CashSaleController.create)


module.exports = router