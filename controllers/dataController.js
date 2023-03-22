const DataService = require('../services/dataService')

async function sendData(request, reply) {
  const dbClient = await (request.server?.pg?.connect() || (async () => {
    const client = await request.server?.mysql?.getConnection()
    client.config.namedPlaceholders = true
    return client
  })())

  if (!dbClient) throw new Error('Нет подключения к базе данных')
  const { type, date, nameQueue } = request.query
  const { DB } = request.server?.config

  const dataService = new DataService(dbClient, DB, type)

  const data = await dataService.getData(date, nameQueue)

  reply.send({ data }).headers('Content-Type', 'application/json; charset=utf-8')
}

module.exports = { sendData }
