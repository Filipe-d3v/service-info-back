const ForwardSale = require("../Models/ForwardSale")

const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = class ForwardSaleController {
  static async create(req, res) {
    const { clientName, clientCPF, clientPhone, clientAdress, products, total } = req.body

    if (!clientName) {
      res.status(420).json({ message: 'Informe o nome do cliente!' })
      return
    }
    if (!clientCPF) {
      res.status(420).json({ message: 'Informe o CPF do cliente!' })
      return
    }
    if (!clientAdress) {
      res.status(420).json({ message: 'Informe o endereço do cliente!' })
      return
    }
    if (!products) {
      res.status(420).json({ message: 'Impossível registrar uma venda sem produtos!' })
      return
    }

    const token = getToken(req)
    const user = getUserByToken(token)

    const forwardSale = new ForwardSale({
      date: new Date().toLocaleString(),
      clientName,
      clientAdress,
      clientCPF,
      clientPhone,
      total,
      products: [...products],
      user: {
        _id: user._id,
        name: user.name,
        surname: user.surname
      }
    })

    try {
      const newForwardSale = await forwardSale.save()
      res.status(200).json({ message: 'Venda registrada!', newForwardSale })
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }

  static async getAll(req, res) {

    const forwardSale = await ForwardSale.find().populate('products').sort('-createdAt')
    res.status(200).json({ forwardSale: forwardSale })
  }

  static async update(req, res) {
    const id = req.params.id

    const { status } = req.body
    const updatedData = {}

    const sale = await ForwardSale.findOne({ _id: id })

    if (!sale) {
      res.status(422).json({ message: 'produto não encontrado. Tente novamente!' })
      return
    }

    if (!status) {
      res.status(422).json({ message: 'Informe o status de pagamento!' })
      return
    } else {
      updatedData.status = status
    }

    await ForwardSale.findByIdAndUpdate(id, updatedData)
    res.status(201).json({ message: 'Venda Atualizada' })
  }

  static async delete(req, res) {
    const id = req.params.id

    if (!ObjectId.isValid(id)) {
      res.status(500).json({ message: 'Id inválido!' })
      return
    }

    const forwardSale = await ForwardSale.findOne({ _id: id })

    if (!forwardSale) {
      res.status(404).json({ message: 'Venda não encontrado!' })
      return
    }

    await forwardSale.findOneAndRemove(id)
    res.status(200).json({ message: 'Venda Apagada!' })
  }
}