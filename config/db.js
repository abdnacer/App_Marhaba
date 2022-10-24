const mongoose = require('mongoose')

const connect_DB = mongoose.connect(process.env.MONGODB_URL, console.log("Database Connected"))

module.exports = connect_DB