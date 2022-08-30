const express = require('express')
const router = express.Router()
const db = require('../../index')

const bcrypt = require('bcrypt')
const { createTokens, validateToken } = require('./JWT')

const SALT = 17

router.post('/register', (req, res) => {
  const { userEmail, password } = req.body
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

router.post('/login', async (req, res) => {
  const { userEmail, password } = req.body
  let user

  await new Promise((resolve, reject) => {
    console.log('MySQL SELECT query') // #3 DEBUG
    db.query(
      'SELECT * FROM user WHERE user_email = ?',
      [userEmail],
      (err, result) => {
        if (err) {
          console.log(err)
          reject('Error in MySQL query')
        } else {
          user = result[0]
          resolve('SELECT done')
        }
      }
    )
  })

  console.log('async done') // #3 DEBUG
  if (!user) return res.status(400).json({ error: "User doesn't exist" })

  const dbPassword = user.password
  bcrypt.compare(password, dbPassword).then((match) => {
    console.log('Bcrypt') // #3 DEBUG
    if (!match) {
      res.status(400).json({ error: 'Wrong password' })
    } else {
      const accessToken = createTokens(user)

      res.cookie('access-token', accessToken, {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        httpOnly: true,
      })

      res.json('Logged in successfully!')
    }
  })
})

router.get('/current_user', validateToken, (req, res) => {
  res.status(200).json(req.loggedInUserPk)
})

router.get('/logout', (req, res) => {
  // #17 TODO: implement logout function (destroy/invalidate JWT)
  res.cookie('access-token', '', { maxAge: 1 })
})

module.exports = router
