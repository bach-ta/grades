const express = require('express')
const router = express.Router()
const db = require('../index')

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
  const { blockName, blockWeight, courseFk, entries } = req.body
  db.query(
    'INSERT INTO block (block_name, block_weight, course_fk, entries) VALUE (?,?,?,?)',
    [blockName, blockWeight, courseFk, entries],
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
