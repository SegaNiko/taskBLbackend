const { Router } = require('express')
const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('./db/sql.db')

const router = Router()

//   api/users/getusers
router.get('/getusers', [], async (req, res) => {
  let sql = `SELECT * FROM users`

  try {
    const db = new sqlite3.Database('./db/sql.db')
    const allUsers = await db.serialize(() => {
      db.all(sql, [], (err, row) => {
        if (err) {
          throw err
        }
        let arr = []
        row.forEach((row) => {
          arr = [...arr, row]
        })

        res.status(200).json(arr)
      })
    })

    db.close()
  } catch (e) {
    console.log('Hyston У нас проблема в api/user', e.message)
  }
})

//   api/users/user/id
router.get('/user/:id', [], async (req, res) => {
  const db = new sqlite3.Database('./db/sql.db')
  const userid = req.params.id
  let sql = `SELECT * FROM users WHERE id = ${userid}`

  try {
    await db.serialize(() => {
      db.get(sql, [], (err, row) => {
        if (err) {
          throw err
        }
        res.status(200).json(row)
        db.close()
      })
    })
  } catch (e) {
    console.log('Hyston У нас проблема в api/user', e.message)
  }
})

//   api/users/page/:
router.get('/page/:page', [], async (req, res) => {
  const db = new sqlite3.Database('./db/sql.db')
  const limitItems = 50
  const page = parseInt(req.params.page)
  const pageEnd = page * limitItems

  const pageStart = pageEnd - limitItems

  let sql = `SELECT * FROM users WHERE id BETWEEN ${pageStart} and ${pageEnd}`

  try {
    await db.serialize(() => {
      db.all(sql, [], (err, row) => {
        if (err) {
          throw err
        }

        let arr = []
        row.forEach((row) => {
          arr = [...arr, row]
        })

        res.json(arr)
        db.close()
      })
    })
  } catch (e) {
    console.log('Hyston У нас > проблема в api/user', e.message)
  }
})

module.exports = router
