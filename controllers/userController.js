const { User } = require('../models')
const { generateToken } = require('../helper/userToken.js')
const { checkPassword } = require('../helper/bcrypt.js')

class UserController  {
    static async registerUser(req, res, next) {
        const { email, password, phone_number} = req.body
        try {
            const user = await User.create({
                email, 
                password,
                phone_number
            })
            res.status(201).json({ 
                id: user.id, 
                email: user.email ,
                phone_number: user.phone_number
            })

        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    static async loginUser(req, res, next) {
        const {email, password} = req.body
        try {
            const user = await User.findOne({
                where: {
                    email
                }
            })

            if(!user) {
                throw {status: 400, message: "email or password incorrect"}
            } else {
                const isPasswords = checkPassword(password, user.password)
                if (!isPasswords) {
                    throw {status: 400, message: "email or password incorrect"}
                } else {
                    let obj = {
                        id: user.id,
                        email: user.email
                    }
                    const access_token = generateToken(obj)
                    res.status(200).json({access_token})
                }
            }

        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    static async forgotPassword (req, res, next) {
        const {
          email
        } = req.body;
        try {
          const user = await User.findOne({
            where: {
              email
            }
          });
    
          if (!user) {
            return res.status(400).json({message: "user not found"});
          }

          const updated = await User.update({
            password: email
          }, { where: { email }, returning: true });
          if (!updated) {
            return res.status(400).json({message: "user not found"});
          }
          return res.status(201).json({updated: updated[1][0], message: "Success Forgot Password"});

        } catch (err) {
          await t.rollback();
          console.log(err);
          next(err);
          return res.status(500).json(responseFailed('Internal server error'));
        }
      }

}

module.exports = UserController