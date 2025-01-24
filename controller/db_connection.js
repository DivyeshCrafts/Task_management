const mongoose = require('mongoose')
mongoose.set('debug', true)


module.exports.db_connect = async function(){
    try {
        return mongoose.connect('mongodb://127.0.0.1:27017/task_menagmnet')
    } catch (error) {
        console.log("mongodb error", error)
    }
}