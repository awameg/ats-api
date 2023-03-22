const app = require('fastify')({
  logger: true,
  ajv: {
    customOptions: {
      allErrors: true
    },
    plugins: [
      require('ajv-errors')
    ]
  }
})
const helmet = require('@fastify/helmet')
const cors = require('@fastify/cors')
const dotenv = require('@fastify/env')
const dotenvSchema = require('./schemas/dotenvSchema')
const dbConnector = require('./utils/dbConnector')

const mainRouter  = require('./routes/router')

app.register(dotenv, {
  dotenv: true,
  confKey: 'config',
  data: process.env,
  schema: dotenvSchema
}).ready(async (err) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
  await start()
})

app.register(cors)
app.register(helmet);
app.register(dbConnector)

app.register(mainRouter, {prefix: '/api'})

const start = async () => {
  try {
    await app.listen({ port: app.config?.PORT, host: '0.0.0.0' })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}
