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

app.get('/terms', (req, res) => {
  db.query(
    'SELECT * FROM terms',
    (err, result) => { if (err) { console.log(err) } else { res.send(result) } }
  )
})

app.post('/terms/add', (req, res) => {
  const termName = req.body.termName
  db.query(
    'INSERT INTO terms (name, courses) VALUE (?,?)',
    [termName, '[]'],
    (err, result) => { if (err) { console.log(err) } else { res.send("Values inserted") } }
  )
})

app.put('/terms/update', (req, res) => {
  const termName = req.body.termName
  const courseList = req.body.courseList
  const termID = req.body.termID
  db.query(
    'UPDATE terms SET name = ?, courses = ? WHERE id = ?',
    [termName, courseList, termID],
    (err, result) => { if (err) { console.log(err) } else { res.send(result) } }
  )
})

app.delete('/terms/delete/:id', (req, res) => {
  const id = req.params.id
  console.log(id)
  db.query("DELETE FROM terms WHERE id = ?", id,
    (err, result) => { if (err) { console.log(err) } else { res.send(result) } }
  )
})

app.get('/courses', (req, res) => {
  db.query(
    'SELECT * FROM courses',
    (err, result) => { if (err) { console.log(err) } else { res.send(result) } }
  )
})

app.post('/courses/add', (req, res) => {
  const courseName = req.body.courseName
  db.query(
    'INSERT INTO courses (name, blocks) VALUE (?,?)',
    [courseName, '[]'],
    (err, result) => { if (err) { console.log(err) } else { res.send("Values inserted") } }
  )
})

app.put('/courses/update', (req, res) => {
  const courseName = req.body.courseName
  const blockList = req.body.blockList
  const courseID = req.body.courseID
  db.query(
    'UPDATE courses SET name = ?, blocks = ? WHERE id = ?',
    [courseName, blockList, courseID],
    (err, result) => { if (err) { console.log(err) } else { res.send(result) } }
  )
})

app.get('/blocks', (req, res) => {
  db.query(
    'SELECT * FROM blocks',
    (err, result) => { if (err) { console.log(err) } else { res.send(result) } }
  )
})

app.post('/blocks/add', (req, res) => {
  const reqBody = req.body
  db.query(
    'INSERT INTO blocks (name, weight, count, entries) VALUE (?,?,?,?)',
    [reqBody.name, reqBody.weight, reqBody.count, reqBody.entries],
    (err, result) => { if (err) { console.log(err) } else { res.send("Values inserted") } }
  )
})

app.listen(3001, () => {
  console.log("Server is running on port 3001")
})