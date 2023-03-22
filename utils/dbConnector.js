const fastifyPlugin = require('fastify-plugin')

async function dbConnector (fastify) {
  let db
  let opts = {
    connectionString: fastify.config?.CONN_STR
  }
  switch (fastify.config?.DB) {
    case 'PG':
      db = require('@fastify/postgres')
      break;
    case 'MYSQL':
      db = require('@fastify/mysql')
      opts.promise = true
      break;
    default:
      throw new Error('Не инициализирован драйвер для базы данных')
  }

  fastify.register(db, opts)
}

module.exports = fastifyPlugin(dbConnector)
