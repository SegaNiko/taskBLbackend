const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./sql.db')
const usersdb = require('./users.json')
const users_statdb = require('./users_statistic.json')

const createUsersDB = async () => {
  await db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users 
    ( id NUM,
      first_name TEXT,
      last_name TEXT,
      email TEXT,
      gender TEXT,
      ip_address TEXT)`)
    db.get(`SELECT count(*) FROM users`, (err, req) => {
      const count = req[`count(*)`]
      if (count === 0) {
        let stmt = db.prepare('INSERT INTO users VALUES (?,?,?,?,?,?)')

        usersdb.map((item) => {
          stmt.run(
            item.id,
            item.first_name,
            item.last_name,
            item.email,
            item.gender,
            item.ip_address
          )
        })

        stmt.finalize()
        db.close()
      }
    })
  })
}

const createStatisticDb = async () => {
  await db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users_stat 
    ( user_id INTEGER,
    date INTEGER,
    page_views INTEGER,
    clicks INTEGER)`)

    db.get(`SELECT count(*) FROM users_stat`, (err, req) => {
      req
      const count = req[`count(*)`]

      if (count === 0) {
        let add = db.prepare('INSERT INTO users_stat VALUES (?,?,?,?)')
        users_statdb.map((item) => {
          add.run(item.user_id, item.date, item.page_views, item.clicks)
        })
        add.finalize()

        db.close()
      }
    })
  })
}

const checkDB = async () => {
  await createUsersDB()
  await createStatisticDb()
}
module.exports = checkDB
