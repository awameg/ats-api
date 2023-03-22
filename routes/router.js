const networkController = require('../controllers/dataController')
const mainSchema = require('../schemas/routesSchema')

async function mainRouter (fastify) {
  fastify.get('/getData', { schema: mainSchema }, networkController.sendData)
  fastify.get('/test', function (req, res) {
    res.send({message: 'Сервис доступен', success: true})
  })
}

module.exports = mainRouter
