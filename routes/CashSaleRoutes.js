const router = require('express').Router()

const CashSaleController = require('../controllers/CashSaleController')

const verifyToken = require('../helpers/verify-token')

router.patch('/create', verifyToken, )


module.exports = router