const Product = require('../Models/Product')

//helpers
const ObjectId = require('mongoose').Types.ObjectId

module.exports = class ProductController {
  static async createProduct(req, res) {
    const { name, dpt, description, quantity, price } = req.body
    
    if(!req.file.filename) {
      res.status(422).json({message: 'Insira uma foto para o produto!'})
      return
    }

    const image = req.file.filename
    
    if (!name) {
      res.status(422).json({ message: 'O campo nome é obrigatório!' })
      return
    }
    if (!dpt) {
      res.status(422).json({ message: 'O campo tipo é obrigatório!' })
      return
    }
    if (!quantity) {
      res.status(422).json({ message: 'O campo quantidade é obrigatório!' })
      return
    }
    if (!price) {
      res.status(422).json({ message: 'O campo preço é obrigatório!' })
      return
    }

    const product = new Product({
      name,
      dpt,
      description,
      quantity,
      price,
      image,
    })

    try {
      const newProduct = await product.save()
      res.status(200).json({ message: 'Produco cadastrado com sucesso!', newProduct })
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }

  static async getAll(req, res) {
    const products = await Product.find().sort('-createdAt')

    res.status(200).json({ products: products, })
  }

  static async getProductById(req, res) {
    const id = req.params.id

    // check if id is valid
    if (!ObjectId.isValid(id)) {
      res.status(200).json({ message: 'ID inválido!' })
      return
    }

    // Check if product exists
    const product = await Product.findOne({ _id: id })

    if (!product) {
      res.status(404).json({ message: 'Produto não encontrado!' })
    }

    res.status(200).json({ product: product, })
  }

  static async updateProduct(req, res) {
    const id = req.params.id

    const { name, type, description, quantity, price } = req.body
    const image = req.file.filename

    const updatedData = {}

    const product = await Product.findOne({ _id: id })

    if (!product) {
      res.status(404).json({ message: 'Produto não encontrado!' })
      return
    }

    // Validations
    if (!name) {
      res.status(422).json({ message: 'O campo nome é obrigatório!' })
      return
    } else {
      updatedData.name = name
    }
    if (!description) {
      res.status(422).json({ message: 'O campo descrição é obrigatório!' })
      return
    } else {
      updatedData.description = description
    }
    if (!price) {
      res.status(422).json({ message: 'O campo preço é obrigatório!' })
      return
    } else {
      updatedData.price = price
    }
    if (!type) {
      res.status(422).json({ message: 'O campo tipo é obrigatório!' })
      return
    } else {
      updatedData.type = type
    }
    if (!quantity) {
      res.status(422).json({ message: 'O campo quantidade é obrigatório!' })
      return
    } else {
      updatedData.quantity = quantity
    }
    if (image) {
      updatedData.image = image
    }

    await Product.findByIdAndUpdate(id, updatedData)

    res.status(200).json({ message: 'Prduto atualizado!' })
  }

  static async removeProductById(req, res) {
    const id = req.params.id

    if (!ObjectId.isValid(id)) {
      res.status(200).json({ message: 'ID inválido!' })
      return
    }

    // Check if product exists
    const product = await Product.findOne({ _id: id })

    if (!product) {
      res.status(404).json({ message: 'Produto não encontrado!' })
      return
    }

    await Product.findByIdAndDelete(id)

    res.status(200).json({ message: 'Produto removido!' })
  }
}