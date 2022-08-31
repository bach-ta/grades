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

module.exports = router
