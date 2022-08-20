const express = require('express')
const router = express.Router()
const db = require('../index')

const bcrypt = require('bcrypt')
// const { createTokens, validateToken } = require('./JWT')

const SALT = 17

router.post('/register', (req, res) => {
  const { userEmail, username, password } = req.body
  bcrypt.hash(password, SALT).then((hashedPassword) => {
    db.query(
      'INSERT INTO user (user_email, password) VALUE (?,?)',
      [userEmail, hashedPassword],
      (err, result) => {
        if (err) {
          console.log(err)
        } else {
          res.send(result)
        }
      }
    )
  })
})

module.exports = router
