const mongoose = require('mongoose')


const user_schema = new mongoose.Schema({
    name:{type: String, default:""},
    email:{type: String, default:""},
    password:{type: String, default:""},
    city:{type: String, default:""},
})

module.exports = user_schema