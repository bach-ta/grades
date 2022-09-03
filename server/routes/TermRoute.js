const express = require('express')
const router = express.Router()
const db = require('../index')
const { validateToken } = require('./Auth/JWT')

router.use('/', validateToken)

router.get('/', (req, res) => {
  db.query(
    'SELECT * FROM term WHERE owner_user_fk = ? ORDER BY term_pk DESC',
    req.loggedInUserPk,
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    }
  )
})

router.post('/add', (req, res) => {
  const termName = req.body.termName
  db.query(
    'INSERT INTO term (term_name, owner_user_fk) VALUE (?,?)',
    [termName, req.loggedInUserPk],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    }
  )
})

router.delete('/delete/:termPk', (req, res) => {
  const termPk = req.params.termPk
  db.query('DELETE FROM term WHERE term_pk = ?', termPk, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
})

router.put('/update_average', (req, res) => {
  const { termPk, coursePk } = req.body // #4 accept termPk or coursePk
  if (!!termPk === !!coursePk)
    res
      .status(400)
      .json('Error: Can only pass termPk OR coursePk to /terms/update_average')
  const DBQuery = `
  UPDATE term,
    (SELECT CAST(SUM(course_average) / COUNT(course_pk) AS DECIMAL(5,2))
      AS term_average
      FROM course
        WHERE term_fk = ${
          termPk ? '?' : '(SELECT term_fk FROM course WHERE course_pk = ?)'
        } 
        AND course_average IS NOT NULL
    ) AS result
  SET term.term_average = result.term_average
  WHERE term_pk = ${
    termPk ? '?' : '(SELECT term_fk FROM course WHERE course_pk = ?)'
  };
  `
  const DBQueryParams = termPk ? [termPk, termPk] : [coursePk, coursePk]

  db.query(DBQuery, DBQueryParams, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
})

module.exports = router
