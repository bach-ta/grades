const { sign, verify } = require('jsonwebtoken')

const createTokens = (user) => {
  const accessToken = sign(
    { userEmail: user.user_email, userPk: user.user_pk },
    'myjwtsecret1234' // #15 TODO: update key
  )
  return accessToken
}

const validateToken = (req, res, next) => {
  const accessToken = req.cookies['access-token']

  if (!accessToken) {
    return res.status(400).json({ error: 'User not authenticated!' })
  }

  try {
    const validToken = verify(accessToken, 'myjwtsecret1234') // #15 TODO: update key
    if (validToken) {
      req.authenticated = true
      req.loggedInUserPk = validToken.userPk
      return next()
    }
  } catch (err) {
    return res.status(400).json({ error: err })
  }
}

module.exports = { createTokens, validateToken }
