const express = require('express')
const router = express.Router()
const db = require('../index')

router.get('/', (req, res) => {
  db.query('SELECT * FROM courses', (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
})

router.post('/add', (req, res) => {
  const courseName = req.body.courseName
  const termFk = req.body.termFk
  db.query(
    'INSERT INTO courses (course_name, term_fk) VALUE (?,?)',
    [courseName, termFk],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    }
  )
})

module.exports = router
