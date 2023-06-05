const CashSale = require('../Models/CashSale')

const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = class CashSaleController {
  static async create(req, res) {
    const { total, type_payment, products } = req.body
    console.log(total)
    console.log(type_payment)
    console.log(products)

    if (!type_payment) {
      res.status(422).json({ message: 'Informe o tipo de pagamento!' })
      return
    }

    const token = getToken(req)
    const user = await getUserByToken(token)

    console.log(user)

    const cashsale = new CashSale({
      date: new Date().toLocaleString(),
      products: [...products],
      total: total,
      type_payment: type_payment,
      user: {
        _id: user._id,
        name: user.name,
        surname: user.surname,
      }
    })

    try {

      const newCashSale = await cashsale.save()
      res.status(200).json({ message: 'Vennda Registrada!', newCashSale })

    } catch (error) {
      res.status(500).json({ message: error })
    }
  }

  static async getAll(req, res) {
    const cashsale = await CashSale.find().populate('products').sort('-createdAt')

    res.status(200).json({ cashsale: cashsale })
  }

  static async delete(req, res) {
    const id = req.params.id

    if (!ObjectId.isValid(id)) {
      res.status(500).json({ message: 'Id inválido!' })
      return
    }

    const cashsale = await CashSale.findOne({ _id: id })

    if (!cashsale) {
      res.status(404).json({ message: 'Venda não encontrado!' })
      return
    }

    await CashSale.findOneAndRemove(id)
    res.status(200).json({message: 'Venda Apagada!'})
  }
}