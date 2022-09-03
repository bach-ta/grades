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

router.put('/update_average', (req, res) => {
  const coursePk = req.body.coursePk
  db.query(
    ` UPDATE course,
        (SELECT CAST(100 * SUM(block_average) / SUM(block_weight) AS DECIMAL(5,2))
          AS course_average
          FROM block WHERE course_fk = ? AND block_average IS NOT NULL
        ) AS result
      SET course.course_average = result.course_average
      WHERE course_pk = ?;`,
    [coursePk, coursePk],
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
