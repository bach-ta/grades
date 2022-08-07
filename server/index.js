const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')
const PORT = 3001

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: 'password',
  database: 'gradessystem'
})

module.exports = db

const termRoute = require('./routes/TermRoute')
const courseRoute = require('./routes/CourseRoute')
app.use('/terms', termRoute)
app.use('/courses', courseRoute)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})