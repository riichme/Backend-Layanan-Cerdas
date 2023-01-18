const userDetailRouter = require("express").Router();
const userDetailController = require("../controllers/userDetailController.js")
const { userDetailAuthorization } = require("../middlewares/auth.js");


userDetailRouter.post('/', userDetailController.postUserDetails)

userDetailRouter.get('/', userDetailController.getUserDetails)

userDetailRouter.get('/:id', userDetailAuthorization, userDetailController.getUserDetailId)

userDetailRouter.put('/:id', userDetailAuthorization, userDetailController.putUserDetailsId)

userDetailRouter.delete('/:id', userDetailAuthorization, userDetailController.deleteUserDetailsId)

module.exports = userDetailRouter