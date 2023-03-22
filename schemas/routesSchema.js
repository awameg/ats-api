const mainSchema = {
  query: {
    type: 'object',
    required: ['type', 'date', 'nameQueue'],
    properties: {
      type: { type: 'string', pattern: 'hours|days' },
      date: { type: 'string', format: 'date' },
      nameQueue: { type: 'integer'}
    },
    errorMessage: {
      required: {
        type: 'Тип запроса должен быть передан',
        date: 'Дата выборки должна быть передана',
        nameQueue: 'Идентификатор очереди должен быть передан'
      },
      properties: {
        type: 'Тип запроса должен быть равен только hours (часы) или days (дни)',
        date: 'Дата выборки должна проходить по маске валидной даты (формат - yyyy-mm-dd)',
        nameQueue: 'Тип должен быть числом'
      }
    }
  },
  response: {
    default: {
      type: 'object',
      properties: {
        statusCode: { type: 'integer' },
        message: { type: 'string' },
        error: {
          type: 'boolean',
          default: true
        }
      }
    },
    '2xx': {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              holdtime_sek: { type: 'integer' },
              holdtime_min: {type: 'integer'},
              date: { type: 'string', format: 'date' },
              noanswer: {type: 'integer'},
              answer: {type: 'integer'},
              total: {type: 'integer'},
              queue_stats_id: {type: 'integer'},
              datetime: {type: 'string', format: 'date-time'},
              nameQueue: {type: 'string'},
              agent: {type: 'string'},
              event: {type: 'string'},
              info1: {type: 'string'},
              info2: {type: 'string'},
              info3: {type: 'string'},
            }
          }
        },
        idmu: {type: 'integer'}
      }
    }
  }
}

module.exports = mainSchema
