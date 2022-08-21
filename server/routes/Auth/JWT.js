const { sign, verify } = require('jsonwebtoken')

const createTokens = (user) => {
  const accessToken = sign(
    { username: user.user_email, id: user.user_pk },
    'myjwtsecret1234' // #15 TODO
  )
  return accessToken
}

const validateToken = (req, res, next) => {
  // console.log(req) // DEBUG
  const accessToken = req.cookies['access-token']

  if (!accessToken) {
    return res.status(400).json({ error: 'User not authenticated!' })
  }

  try {
    const validToken = verify(accessToken, 'myjwtsecret1234') // #15 TODO
    if (validToken) {
      req.authenticated = true
      return next()
    }
  } catch (err) {
    return res.status(400).json({ error: err })
  }
}

module.exports = { createTokens, validateToken }
