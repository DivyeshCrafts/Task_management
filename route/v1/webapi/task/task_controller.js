const common = require('../../../../controller/common')
const db_connection = require('../../../../controller/db_connection')
const tasks_schema = require('../../../../model/tasks')
const task_history_schema = require('../../../../model/tasks_history')

//add & edit
module.exports.add_edit = async function(req, res){
    let decoded_token = await common.decodedjwt(req.headers.authorization)
    if(decoded_token){

        try {
            let request_body = req.body
            let bdconnect = await db_connection.db_connect()
            let task_connection = bdconnect.model('tasks', tasks_schema)
            let task_history_connection = bdconnect.model('tasks_history', task_history_schema)


            if(request_body._id){
                //edit code
                request_body.update_at = Math.floor(new Date().getTime()/1000.0);
                let one_task = await task_connection.findOne({_id:request_body._id})
                let update_task = await task_connection.updateOne({_id:request_body._id}, {$set: request_body})

                if(update_task){
                    let update_obj = {

                        task_id:request_body._id,
                        action:"update",
                        changes: {
                            after: request_body,
                            before: one_task
                        },
                        user_id: decoded_token._id,
                        create_at: Math.floor(new Date().getTime()/1000.0),

                    }
                    let create_history  = new task_history_connection(update_obj)
                    let save_history = await create_history.save()
                    
                    res.send({message:"Task updated.", status: true})
                }else{
                    res.send({message:"Task not updated.", status: flase})
                }

            }else{
                //add code
                request_body.create_at = Math.floor(new Date().getTime()/1000.0);
                request_body.update_at = Math.floor(new Date().getTime()/1000.0);
    
                let create_task = new task_connection(request_body)
                let save_task = await create_task.save()
    
                if(save_task){

                    //history manage
                    let history_obj = {
                        task_id:save_task._id,
                        action:"create",
                        changes: {
                            after: request_body
                        },
                        user_id: decoded_token._id,
                        create_at:Math.floor(new Date().getTime()/1000.0)
                    }
                    let create_history = new task_history_connection(history_obj)
                    await create_history.save()

                    res.send({message:"Create task successfull.", status: true, data: save_task})
                }else{
                    res.send({message:"Task not created.", status: false})
                }
            }
           

        } catch (error) {
            console.log("error", error)
            res.send({message: "Something went wrong, please try again."})
        }
      
    }else{
        res.send({messgae:"User is invalid, please try again"})
    }
}

//delete
module.exports.delete = async function (req, res) {

    let decoded_token = common.decodedjwt(req.headers.authorization)
    if(decoded_token){

        try{
            let request_body = req.body
            let bdconnect = await db_connection.db_connect()
            let task_connection = bdconnect.model('tasks', tasks_schema)

            let task_delet = await task_connection.deleteOne({_id: request_body._id})
            console.log("task_delet", task_delet)
            if(task_delet.deletedCount != 0){
                res.send({message:"Task delete successfull."})
            }else{
                res.send({message:"Task not delete."})
            }

        }catch(error){
            console.log("error", error)
            res.send({message: "Something went wrong, please try again."})
        }

    }else{
        res.send({messgae:"User is invalid, please try again"})
    }
    
}

//get tasks base on deadline, duration, priority
module.exports.get_tasks = async function(req, res){
    let decoded_token = common.decodedjwt(req.headers.authorization)
    if(decoded_token){
    try {
        let bdconnect = await db_connection.db_connect()
        let task_connection = bdconnect.model('tasks', tasks_schema)

        let get_data = await task_connection.aggregate([
            {
                $addFields:{
                    priority_order: {
                        $arrayElemAt: [
                            ["High", "Medium", "Low"],
                     {$indexOfArray:[["High", "Medium", "Low"], "$priority"]},
                    ]
                 }
                }
            },
           {
            $sort:{ deadline : 1, priority_order:1, duration:1}
           },
           {
            $unset: "priority_order"
           }
        ])
        if(get_data.length != 0){
            res.send({message:"Task list", status:true, data:get_data})
        }else{
            res.send({message:"Not found task list", status:false,})
        }
    } catch (error) {
        console.log("error", error)
        res.send({message: "Something went wrong, please try again."})
    }
}else{
    res.send({messgae:"User is invalid, please try again", status: false})
}
}