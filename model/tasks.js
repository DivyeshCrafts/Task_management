const mongoose = require('mongoose')


const tasks_schema = new mongoose.Schema({
    title:{type:String, default:""},
    description:{type:String, default:""},
    duration: {type:Number, default:0},
    deadline:{type: Number, default:0},
    priority:{type: String, enum:["High", "Medium", "Low"]},
    create_at:{type:Number, default:0},
    update_at:{type:Number, default:0}
})

module.exports = tasks_schema