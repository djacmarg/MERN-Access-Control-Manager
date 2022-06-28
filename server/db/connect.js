//require mongoose for MongoDB
//this is where we initiate DB connection

const mongoose = require('mongoose')

const connectDB = (url) => {
  return mongoose.connect(url)
  .then(() => console.log('Mongo Database connected...'))
  .catch((err) => console.log(err)) 
}
module.exports = connectDB

