const validation  = require('../../../../controller/validation')

const add_edit = (req, res, next)=>{

    let rules = {
        title: "required",
        duration: "required",
        deadline: "required",
        priority: "required"
    }
    validation(req.body, rules, (error, status)=>{
        if(!status){
            res.send({message:"Validation faild", status: status, data: error})
        }else{
            next()
        }
    })
}

const delete_task = (req, res, next)=>{
    let rules = {
        _id: "required"
    }
    validation(req.body, rules, (error, status)=>{
        if(!status){
            res.send({message:"Validation faild", status: false, data: error})
        }else{
            next()
        }
    })
}


module.exports = {
    add_edit, delete_task
}