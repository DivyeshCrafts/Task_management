const validation = require('../../../../controller/validation')

const registration = (req, res, next)=>{
    let rules = {
        "name": "required",
        "email": "required",
        "password": "required",
    }
    validation(req.body, rules, (error, status)=>{
     if(!status){
        res.send({status: status, message: "validation is in correct.", data: error})
     }else{
        next()
     }
    })
}

const login = (req, res, next)=>{
    let rules = {
        email:"required",
        password:"required",
    }
    validation(req.body, rules, (error, status)=>{
        if(!status){
            res.send({status: false, message:"validation faild", data: error})
        }else{
            next()
        }
    })
}

module.exports = {
    registration,
    login
}