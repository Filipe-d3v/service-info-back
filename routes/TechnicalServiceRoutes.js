const router = require('express').Router()

const techService = require('../controllers/TechnicalServiceController')

const verifyToken = require('../helpers/verify-token')

router.post('/create', verifyToken, techService.createTechService)
router.get('/', verifyToken, techService.getAll)
router.get('/:id', verifyToken, techService.getTechserviceById)
router.patch('/update/:id', verifyToken, techService.updateTechService)
router.delete('/delete/:id', verifyToken, techService.removeTechServiceById)

module.exports = router