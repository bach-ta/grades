const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: 'password',
  database: 'gradessystem'
})

// TERMS

app.get('/terms', (req, res) => {
  db.query(
    'SELECT * FROM terms',
    (err, result) => { if (err) { console.log(err) } else { res.send(result) } }
  )
})

app.post('/terms/add', (req, res) => {
  const termName = req.body.termName
  db.query(
    'INSERT INTO terms (term_name) VALUE (?)',
    [termName],
    (err, result) => { if (err) { console.log(err) } else { res.send(result) } }
  )
})

app.delete('/terms/delete/:termPk', (req, res) => {
  const termPk = req.params.termPk
  db.query("DELETE FROM terms WHERE term_pk = ?", termPk,
    (err, result) => { if (err) { console.log(err) } else { res.send(result) } }
  )
})


// COURSES

app.get('/courses', (req, res) => {
  db.query(
    'SELECT * FROM courses',
    (err, result) => { if (err) { console.log(err) } else { res.send(result) } }
  )
})

app.post('/courses/add', (req, res) => {
  const courseName = req.body.courseName
  const termFk = req.body.termFk
  db.query(
    'INSERT INTO courses (course_name, term_fk) VALUE (?,?)',
    [courseName, termFk],
    (err, result) => { if (err) { console.log(err) } else { res.send(result) } }
  )
})

app.listen(3001, () => {
  console.log("Server is running on port 3001")
})