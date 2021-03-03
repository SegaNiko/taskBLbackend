const express = require('express')
const checkDB = require('./db/checkdb')
const app = express()

app.use('/api/users', require('./routes/user.routes'))
app.use('/api/statistic', require('./routes/statistic.routes'))

const start = () => {
  try {
    app.listen(5000, () => console.log(`App has been started on port 5000...`))
  } catch (err) {
    console.log('Server Errror :', err.message)
  }
}
checkDB()
start()
