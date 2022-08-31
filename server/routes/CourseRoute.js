const express = require('express')
const router = express.Router()
const db = require('../index')
const { validateToken } = require('./Auth/JWT')

router.use('/', validateToken)

router.get('/', (req, res) => {
  db.query('SELECT * FROM course', (err, result) => {
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
    'INSERT INTO course (course_name, term_fk) VALUE (?,?)',
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
