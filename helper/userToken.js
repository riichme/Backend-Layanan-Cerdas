const jwt = require("jsonwebtoken")
const SECRET = process.env.SECRET

function generateToken(user) {
    const {id, email} = user
    let access_token = jwt.sign({id, email}, SECRET)
    return access_token
}

function verifyToken(token) {
    return jwt.verify(token, SECRET)
}

module.exports = { generateToken, verifyToken }