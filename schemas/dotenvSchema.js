const dotenvSchema = {
  type: 'object',
  required: ['NODE_ENV', 'CONN_STR', 'DB'],
  properties: {
    PORT: {
      type: 'integer',
      default: 3000
    },
    DB: {
      type: 'string'
    },
    CONN_STR: {
      type: 'string'
    },
    NODE_ENV: {
      type: 'string'
    }
  }
}

module.exports = dotenvSchema
