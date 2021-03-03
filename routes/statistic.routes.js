const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('./db/sql.db')

const router = Router()

// api/statistic/getall
router.get('/getall', [], async (req, res) => {
  let sql = `SELECT * FROM users_stat`
  try {
    const db = new sqlite3.Database('./db/sql.db')
    await db.serialize(() => {
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
    console.log('У нас проблема в api/statistic', e.message)
  }
})

// api/statistic/user/:id
router.get('/user/:id', [], async (req, res) => {
  const db = new sqlite3.Database('./db/sql.db')
  const userid = req.params.id
  let sql = `SELECT * FROM users_stat WHERE user_id = ${userid}`

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
        res.status(200).json(arr)
        db.close()
      })
    })
  } catch (e) {
    console.log('У нас проблема в api/statistic', e.message)
  }
})

// api/statistic/page/:page
router.get('/page/:page', [], async (req, res) => {
  const db = new sqlite3.Database('./db/sql.db')
  const limitItems = 50
  const page = parseInt(req.params.page)
  // if (!page) {
  //   page = 1
  // }
  const endId = page * limitItems
  const startId = endId - limitItems

  let sql = `SELECT * FROM users_stat WHERE user_id BETWEEN ${startId} and ${endId}`

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

// router.post(
//   '/bydate',
//   [
//     check('date.id').isInt(),
//     check('date.to', 'Не коректная дата').isDate(),
//     check('date.from', 'Не коректная дата').isDate(),
//   ],
//   async (req, res) => {
//     try {
//       const errors = validationResult(req)

//       if (!errors.isEmpty()) {
//         return res.status(400).json({
//           errors: errors.aray,
//           message: 'Не коректная дата',
//         })
//       }
//       const db = new sqlite3.Database('./db/sql.db')
//
//       const { date } = req.body
//       let sql = `SELECT * FROM users_stat WHERE user_id = ${date.id} WHERE data BETWEEN ${date.from} and ${data.to}`

//       await db.serialize(() => {
//         db.all(sql, [], (err, row) => {
//           if (err) {
//             throw err
//           }

//           let arr = []
//           row.forEach((row) => {
//             arr = [...arr, row]
//           })
//           res.json(arr)
//           db.close()
//         })
//       })
//     } catch (e) {
//       res.status(500).json({ message: 'Something wrong try later' })
//     }
//   }
// )

module.exports = router
