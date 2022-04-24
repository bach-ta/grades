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

app.post('/terms/add', (req, res) => {
  const termName = req.body.termName
  db.query(
    'INSERT INTO terms (name, courses) VALUE (?,?)',
    [termName, '[]'],
    (err, result) => { if (err) { console.log(err) } else { res.send("Values inserted") } }
  )
})

app.get('/terms', (req, res) => {
  db.query(
    'SELECT * FROM terms',
    (err, result) => { if (err) { console.log(err) } else { res.send(result) } }
  )
})

app.post('/courses/add', (req, res) => {
  const courseName = req.body.courseName
  const credit = req.body.credit
  db.query(
    'INSERT INTO courses (name, blocks, credit) VALUE (?,?,?)',
    [courseName, '[]', credit],
    (err, result) => { if (err) { console.log(err) } else { res.send("Values inserted") } }
  )
})

app.get('/courses', (req, res) => {
  db.query(
    'SELECT * FROM courses',
    (err, result) => { if (err) { console.log(err) } else { res.send(result) } }
  )
})

app.put('/terms/update_courses', (req, res) => {
  const newCourseList = req.body.newCourseList
  const termID = req.body.termID
  db.query(
    'UPDATE terms SET courses = ? WHERE id = ?',
    [newCourseList, termID],
    (err, result) => { if (err) { console.log(err) } else { res.send(result) } }
  )
})

app.delete('/terms/delete/:id', (req, res) => {
  const id = req.params.id
  console.log(id)
  db.query("DELETE FROM terms WHERE id = ?", id,
    (err, result) => { if (err) { console.log(err) } else { res.send(result) } }
  )
});

app.listen(3001, () => {
  console.log("Server is running on port 3001")
})