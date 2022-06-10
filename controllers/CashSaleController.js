const CashSale = require('../Models/CashSale')

//helpers
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = class CashSaleController {
    static async createCashSale(req, res) {
        const { date, total, products: [], type_payment } = req.body

        if (!type_payment) {
            res.status(422).json({ message: 'Informe o tipo de pagamento!' })
            return
        }

        const token = getToken(req)
        const user = await getUserByToken(token)

        const localdate = new Date().toLocaleString()

        const cashsale = new CashSale({
            date: localdate,
            products: [],
            total,
            type_payment,
            user: {
                _id: user._id,
                name: user.name,
                surname: user.surname,
            }

        })
    }
}