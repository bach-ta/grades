const express = require('express')
const router = express.Router()
const db = require('../index')

router.get('/', (req, res) => {
  db.query(
    'SELECT * FROM terms',
    (err, result) => { if (err) { console.log(err) } else { res.send(result) } }
  )
})

router.post('/add', (req, res) => {
  const termName = req.body.termName
  db.query(
    'INSERT INTO terms (term_name) VALUE (?)',
    [termName],
    (err, result) => { if (err) { console.log(err) } else { res.send(result) } }
  )
})

router.delete('/delete/:termPk', (req, res) => {
  const termPk = req.params.termPk
  db.query("DELETE FROM terms WHERE term_pk = ?", termPk,
    (err, result) => { if (err) { console.log(err) } else { res.send(result) } }
  )
})

module.exports = router