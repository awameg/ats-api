const sqlScripts = require('../utils/sqlScripts')

class DataService {
  constructor(db, dbName, type) {
    this.db = db
    this.sql = sqlScripts.getSql(type, dbName)
  }

  async getData(date, nameQueue) {
    let params = { date, nameQueue }
    let result

    try {
      result = await this.db.query(this.sql, params)
    } finally {
      this.db.release()
    }

    return result?.rows || result[0]
  }

}

module.exports = DataService
