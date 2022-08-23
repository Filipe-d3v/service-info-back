const router = require('express').Router()

const cashSaleController = require('../controllers/CashSaleController')

const verifyToken = require('../helpers/verify-token')

router.post('/create', verifyToken, cashSaleController.create)
router.get('/', verifyToken, cashSaleController.getAll)
router.delete('/:id', verifyToken, cashSaleController.delete)


module.exports = router