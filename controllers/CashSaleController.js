const CashSale = require('../Models/CashSale')

const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = class CashSaleController {
  static async create(req, res, next) {
    const { total, type_payment, products } = req.body

    if (!type_payment) {
      res.status(422).json({ message: 'Informe o tipo de pagamento!' })
      return
    }

    const token = getToken(req);
    const user = await getUserByToken(token);

    

    const cashsale = new CashSale({
      date: new Date().toLocaleString(),
      total: total,
      products: products,
      type_payment: type_payment,
      user: {
        _id: user._id,
        name: user.name
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

  static async totalSales(req, res) {
    const { year, mother } = req.params;
  
  try {
    const vendas = await CashSale.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(year, mother, 1),
            $lt: new Date(year, mother, 31)
          }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$total" }
        }
      }
    ]);

    console.log(vendas)
    
    const totalVendas = vendas.length > 0 ? vendas[0].total : 0;
    
    res.json({ total: totalVendas });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ocorreu um erro ao obter o total de vendas.' });
  }

  }
}

