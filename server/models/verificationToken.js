//require mongoose for MongoDB, bcryptjs for encryption
/*
This mongoose model is used to create and store 
verification token agains a user who calls it and its 
later used to verify user

bcryptjs an NPM Package for encryption is used here
*/

const mongoose = require('mongoose')
const BCRYPTJS = require('bcryptjs')
const verificationTokenSchema = new mongoose.Schema({
owner:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
},
token:{
    type: String,
    required: true,
},
createdAt: {
    type: Date,
    expires: 3600,
    default: Date.now(),
}
})


verificationTokenSchema.pre('save', async function(next){
    const salt = await BCRYPTJS.genSalt(10)
    this.token = await BCRYPTJS.hash(this.token, salt)
    //invoke next() for the middleware
    next()
})


verificationTokenSchema.methods.validateToken = async function (token){
  const isMatch = await BCRYPTJS.compare(token, this.token)
  return isMatch
}


// export the verification token schema as VerificationToken
module.exports = mongoose.model("VerificationToken", verificationTokenSchema)