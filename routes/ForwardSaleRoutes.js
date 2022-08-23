const router = require('express').Router()

const forwardSale = require('../controllers/ForwardSaleController')

const verifyToken = require('../helpers/verify-token')

router.post('/create', verifyToken, forwardSale.create)
router.get('/', forwardSale.getAll)
router.patch('/payupdate/:id', verifyToken, forwardSale.update)
router.delete('/:id', verifyToken, forwardSale.delete)

module.exports = router