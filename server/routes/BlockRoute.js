const express = require('express')
const router = express.Router()
const db = require('../index')
const { validateToken } = require('./Auth/JWT')

router.use('/', validateToken)

router.get('/', (req, res) => {
  db.query('SELECT * FROM block', (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
})

router.post('/add', (req, res) => {
  const { blockName, blockWeight, courseFk } = req.body
  db.query(
    'INSERT INTO block (block_name, block_weight, course_fk) VALUE (?,?,?)',
    [blockName, blockWeight, courseFk],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    }
  )
})

router.put('/update_entries', (req, res) => {
  const { entries, blockPk } = req.body
  db.query(
    'UPDATE block SET entries = ? WHERE block_pk = ?',
    [entries, blockPk],
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
