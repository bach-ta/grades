const express = require('express')
const router = express.Router()
const db = require('../index')

const bcrypt = require('bcrypt')
// const { createTokens, validateToken } = require('./JWT')

const SALT = 17

router.post('/register', (req, res) => {
  const { userEmail, username, password } = req.body
  bcrypt
    .hash(password, SALT)
    .then((hashedPassword) => {
      // #3 db query having error
      db.query(
        'INSERT INTO user (user_email, username, password) VALUE (?,?,?)',
        [userEmail, username, hashedPassword],
        (err, result) => {
          if (err) {
            console.log(err)
          } else {
            res.send(result)
          }
        }
      )
    })
    .then(() => {
      res.json('USER REGISTERED')
    })
    .catch((err) => {
      if (err) console.log(err)
    })
})

module.exports = router
