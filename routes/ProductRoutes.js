const router = require('express').Router()

const productController = require('../controllers/ProductController')

const verifyToken = require('../helpers/verify-token')
const uploadImage = require('../helpers/image-upload')

router.post('/create', verifyToken, uploadImage.single('image'), productController.createProduct)
router.get('/', productController.getAll)
router.get('/:id', verifyToken, productController.getProductById)
router.patch('/update/:id', verifyToken, productController.updateProduct)
router.delete('/delete/:id', verifyToken, productController.removeProductById)



module.exports = router