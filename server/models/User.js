/*
This mongoose model is used to create and store 
new users

NMP Packages used here are:
bcryptjs and Json Web token JWT for authenticating auth routes
*/

const mongoose = require('mongoose')
const BCRYPTJS = require('bcryptjs')
const JWT = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email",
          ],
        unique: true,

    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password cannot be less than 8 characters"],
        maxlength: [255, "Password can not be more than 255 xters"],
    },

    verified: {
        type: Boolean,
        default: false,
        required: true
    },

},
{timestamps: true}
)

userSchema.pre('save', async function(next){
    const salt = await BCRYPTJS.genSalt(10)
    this.password = await BCRYPTJS.hash(this.password, salt)
    next()
})

userSchema.methods.createJWT = function () {
    return JWT.sign(
        { userId: this._id, email: this.email }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_AUTH_LIFETIME,
    })
}

userSchema.methods.validatePassword = async function (userPassword){
  const isMatch = await BCRYPTJS.compare(userPassword, this.password)
  return isMatch
}

/*
isEmailInUse function is never used eventually in this project
you may however use it if you please
*/
userSchema.statics.isEmailInUse = async function (userEmail){
    if(!userEmail) throw new Error('Invalid email supplied')
    try { 
      const is_email_in_use = await this.findOne(userEmail)
       if(is_email_in_use) return false
       return true
    } catch (error) {
      console.log(error.message, "Email is already in use")
      return false
    }
  }
  // export the User schema as User
module.exports = mongoose.model("User", userSchema)