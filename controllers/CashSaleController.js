const CashSale = require('../Models/CashSale')
const Product =  require('../Models/Product')


const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = class CashSaleController {
    static async create(req, res) {
        const { total, type_payment } = req.body

        const products = req.body

        if (!type_payment) {
            res.status(422).json({ message: 'Informe o tipo de pagamento!' })
            return
        }

        const token = getToken(req)
        const user = await getUserByToken(token)

        const cashsale = new CashSale({
            date: new Date().toLocaleString(),
            products: [],
            total,
            type_payment,
            user: {
                _id: user._id,
                name: user.name,
                surname: user.surname,
            }
        })

        products.map(product => {
            cashsale.products.push(product)
        })

        try {
            
           const newCashSale = await cashsale.save()
           res.status(200).json({message: 'Vennda Registrada!', newCashSale})
            
        } catch (error) {
            res.status(500).json({message: error})
        }
    }
}