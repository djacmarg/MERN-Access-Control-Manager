/*
This mongoose model is used to create and store 
reset token agains a user who calls it and its 
later used to validate a successful password reset

bcryptjs an NPM Package for encryption is used here
*/

const mongoose = require('mongoose')
const BCRYPTJS = require('bcryptjs')
const resetTokenSchema = new mongoose.Schema({
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


resetTokenSchema.pre('save', async function(next){
    const salt = await BCRYPTJS.genSalt(10)
    this.token = await BCRYPTJS.hash(this.token, salt)
    next()
})


resetTokenSchema.methods.validateToken = async function (token){
  const isMatch = await BCRYPTJS.compare(token, this.token)
  return isMatch
}

// export the reset token schema as ResetToken
module.exports = mongoose.model("ResetToken", resetTokenSchema)