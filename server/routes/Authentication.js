const express = require('express')
const router = express.Router()
const db = require('../index')

const bcrypt = require('bcrypt')
// const { createTokens, validateToken } = require('./JWT')

const SALT = 17

router.post('/register', (req, res) => {
  const { userEmail, username, password } = req.body
  console.log(userEmail)
  console.log(username)
  console.log(password)
  bcrypt
    .hash(password, SALT)
    .then((hashedPassword) => {
      // #3 db query having error
      db.query(
        'INSERT INTO user (user_email, username, password, date_created) VALUE (?,?,?,?)',
        [
          userEmail,
          username,
          hashedPassword,
          new Date().toISOString().slice(0, 19).replace('T', ' '),
        ],
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
