const { verifyToken} = require('../helper/userToken')
const {Product, User, UserDetail} = require('../models')

async function authentication(req, res, next) {
    try {
        const {access_token} = req.headers
        if (access_token) {
            const decode = verifyToken(access_token)
            const foundUser = await User.findOne({
                where: {
                    email: decode.email
                }
            })
            if (foundUser) {
                req.loggedUser = {
                    id: decode.id,
                    email: decode.email
                }
                next()
            } else {
                res.status(401).json({message: "Invalid access_token"})
            }
        } else {
            throw {status: 401, message: "Please login first"}
        }
    } catch (err) {
        res.status(500).json({message: "Internal Server Error"})
    }
}

async function productAuthorization(req, res, next) {
    try {
        const id = +req.params.id
        const foundUser = await Product.findOne({where: { id: id }})
        if (foundUser) {
            if (foundUser.user_id === req.loggedUser.id) {
                next()
            } else {
                res.status(401).json({message: "Unauthorized"})
            }
        } else {
            res.status(401).json({message: "Unauthorized"})
        }
    } catch(err) {
        res.status(500).json({message: "Internal Server Error"})
    }
}

async function userDetailAuthorization(req, res, next) {
    try {
        const id = +req.params.id
        const foundUser = await UserDetail.findOne({where: { id: id }})
        if (foundUser) {
            if (foundUser.user_id === req.loggedUser.id) {
                next()
            } else {
                res.status(401).json({message: "Unauthorized"})
            }
        } else {
            res.status(401).json({message: "Unauthorized"})
        }
    } catch(err) {
        res.status(500).json({message: "Internal Server Error"})
    }
}

module.exports = { authentication, productAuthorization, userDetailAuthorization }