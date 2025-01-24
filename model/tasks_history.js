const mongoose = require('mongoose')


const task_history_schema = new mongoose.Schema({
    task_id:{type:String, default:""},
    action:{type:String, default:""},
    changes: {type:Object, default:{}},
    user_id:{type: String, default:0},
    create_at:{type:Number, default:0},
})

module.exports = task_history_schema