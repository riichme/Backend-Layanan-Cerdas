const productRouter = require("express").Router();
const productController = require("../controllers/productController.js")
const { productAuthorization } = require("../middlewares/auth.js");


productRouter.post('/', productController.postProducts)

productRouter.get('/', productController.getProducts)

productRouter.get('/:id', productAuthorization, productController.getProductId)

productRouter.put('/:id', productAuthorization, productController.putProductsId)

productRouter.delete('/:id', productAuthorization, productController.deleteProductsId)

module.exports = productRouter