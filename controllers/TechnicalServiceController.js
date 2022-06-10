const TechnicalService = require('../Models/TechnicalService')

//helpers
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = class TechnicalServiceController {
    static async createTechService(req, res) {
        const { date, clientName, clientPhone, clientAdress, description, status, value } = req.body

        //Validations
        if(!clientName){
            res.status(422).json({message: 'O nome do cliente é obrigatório!'})
            return
        }
        if(!clientPhone){
            res.status(422).json({message: 'O telefone do cliente é obrigatório!'})
            return
        }
        if(!clientAdress){
            res.status(422).json({message: 'O endereço do cliente é obrigatório!'})
            return
        }
        if(!description){
            res.status(422).json({message: 'A descrição do problema é obrigatória!'})
            return
        }
        if(!status){
            res.status(422).json({message: 'O status da manutenção é obrigatório!'})
            return
        }

        const token = getToken(req)
        const user = await getUserByToken(token)
        
        const localData = new Date().toLocaleString()

        const techService = new TechnicalService({
            date: localData,
            clientName,
            clientPhone,
            clientAdress,
            description,
            status,
            value,
            user: {
                _id: user._id,
                name: user.name,
                surname: user.surname,
            },
        })

        try {
            const newTechService = await techService.save()
            res.status(200).json({message: 'Serviço técnico criado com sucesso!', newTechService})
        } catch (error) {
            res.status(500).json({message: error})
        }
    }

    static async getAll(req, res) {
        const techServices = await TechnicalService.find().sort('-createdAt')

        res.status(200).json({ techServices: techServices, })
    }

    static async getTechserviceById(req, res) {
        const id = req.params.id

        if (!ObjectId.isValid(id)) {
            res.status(200).json({ message: 'ID inválido!' })
            return
        }

        const techService = await TechnicalService.findOne({ _id: id })

        if (!techService) {
            res.status(404).json({ message: 'Serviço técnico não encontrado!' })
        }

        res.status(200).json({ techService: techService, })
    }

    static async updateTechService(req, res) {
        const id = req.params.id

        const { clientName, clientPhone, clientAdress, description, status, value } = req.body

        const updatedData = {}

        const techService = await TechnicalService.findOne({_id: id})

        if(!techService){
            res.status(404).json({message: 'Serviço técnico não encontrado!'})
            return
        }

        //Validações
        if(!clientName){
            res.status(422).json({message: 'O nome do cliente é obrigatório!'})
            return
        }else {
            updatedData.clientName = clientName
        }

        if(!clientPhone){
            res.status(422).json({message: 'O telefone do cliente é obrigatório!'})
            return
        }else {
            updatedData.clientPhone = clientPhone
        }

        if(!clientAdress){
            res.status(422).json({message: 'O endereço do cliente é obrigatório!'})
            return
        }else {
            updatedData.clientAdress = clientAdress
        }

        if(!description){
            res.status(422).json({message: 'A descrição do problema é obrigatória!'})
            return
        }else {
            updatedData.description = description
        }

        if(!status){
            res.status(422).json({message: 'O status da manutenção é obrigatório!'})
            return
        }else {
            updatedData.status = status
        }
            updatedData.value = value

        await TechnicalService.findByIdAndUpdate(id, updatedData)
        res.status(200).json({message: 'Serviço técnico atualizado com sucesso!'})
    }

    static async removeTechServiceById(req, res) {
        const id = req.params.id

        if (!ObjectId.isValid(id)) {
            res.status(200).json({ message: 'ID inválido!' })
            return
        }

        const techService = await TechnicalService.findOne({ _id: id })

        if (!techService) {
            res.status(404).json({ message: 'Serviço técnico não encontrado!' })
            return
        }

        await TechnicalService.findByIdAndDelete(id)

        res.status(200).json({ message: 'Serviço técnico removido!' }) 
    }
}