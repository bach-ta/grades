const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const PORT = 3001

app.use(cors())
app.use(express.json())
app.use(cookieParser())

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: 'password',
  database: 'gradessystem',
})

module.exports = db

const termRoute = require('./routes/TermRoute')
const courseRoute = require('./routes/CourseRoute')
const blockRoute = require('./routes/BlockRoute')
const authRoute = require('./routes/Auth/Authentication')
app.use('/terms', termRoute)
app.use('/courses', courseRoute)
app.use('/blocks', blockRoute)
app.use('/auth', authRoute)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
