const { UserDetail } = require('../models');

class UserDetailController {
    static async postUserDetails(req, res, next) {
        let { first_name, last_name, address, gender, image } = req.body
        let { id } = req.loggedUser
        try {
            const data = await UserDetail.create({
                first_name, 
                last_name, 
                address, 
                gender, 
                image,
                user_id : id
            })
            res.status(201).json(data)
        } catch(err) {
            console.log(err)
            next(err)
        }
    }

    static async getUserDetails(req, res, next) {
        try {
            const data = await UserDetail.findAll({
                where: {
                    user_id: req.loggedUser.id
                }
            })
           if(data) {
               res.status(200).json(data);
           } 
        }
        catch(err) {
            console.log(err)
            next(err)
        }
    }

    static async getUserDetailId(req, res, next) {
        let id = req.params.id
        try {
            const data = await UserDetail.findOne({
                where: {
                    id
                }
            })

            if (!data) {
                throw {status: 404, message: "error not found"}
             } else {
                 res.status(200).json(data)
             }
        } catch(err) {
            console.log(err)
            next(err)
        }

    }

    static async putUserDetailsId(req, res, next) {
        let { first_name, last_name, address, gender, image } = req.body
        let id = +req.params.id
        let data = {
            first_name, 
            last_name, 
            address, 
            gender, 
            image
        }

        try {
            const updated = await UserDetail.update(data, { where: { id: id }, returning: true })
            if (!updated) {
                throw {status: 404, message: "error not found"}
            } else {
                res.status(200).json({
                    updated: updated[1][0]
                })
            }
        } catch (err) {
            console.log(err)
            next(err)
        }

    }

    static async deleteUserDetailsId(req, res, next) {
        let id = +req.params.id
        try {
            const deleted = await UserDetail.destroy({ where: { id: id }, returning: true })
            if (!deleted) {
                throw {status: 404, message: "error not found"}
            } else {
                res.status(200).json({
                    message: "UserDetail successfully deleted"
                })
            }
        } catch(err) {
            console.log(err)
            next(err)
        }
    }

}

module.exports = UserDetailController