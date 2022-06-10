const router = require('express').Router()

const productController = require('../controllers/ProductController')

const verifyToken = require('../helpers/verify-token')

router.post('/create', verifyToken, productController.createProduct)
router.get('/', verifyToken, productController.getAll)
router.get('/:id', verifyToken, productController.getProductById)
router.patch('/update/:id', verifyToken, productController.updateProduct)
router.delete('/delete/:id', verifyToken, productController.removeProductById)



module.exports = router