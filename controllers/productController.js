const { Product } = require('../models');

class ProductController {
    static async postProducts(req, res, next) {
        let { name_product, price, description, image} = req.body
        let { id } = req.loggedUser
        try {
            const data = await Product.create({
                name_product, 
                price, 
                description, 
                image,
                user_id : id
            })
            res.status(201).json(data)
        } catch(err) {
            console.log(err)
            next(err)
        }
    }

    static async getProducts(req, res, next) {
        try {
            const data = await Product.findAll({
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

    static async getProductId(req, res, next) {
        let id = req.params.id
        try {
            const data = await Product.findOne({
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

    static async putProductsId(req, res, next) {
        let { name_product, price, description, image } = req.body
        let id = +req.params.id
        let data = {
            name_product, 
            price, 
            description, 
            image,
        }

        try {
            const updated = await Product.update(data, { where: { id: id }, returning: true })
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

    static async deleteProductsId(req, res, next) {
        let id = +req.params.id
        try {
            const deleted = await Product.destroy({ where: { id: id }, returning: true })
            if (!deleted) {
                throw {status: 404, message: "error not found"}
            } else {
                res.status(200).json({
                    message: "Product successfully deleted"
                })
            }
        } catch(err) {
            console.log(err)
            next(err)
        }
    }

}

module.exports = ProductController