const db_connection = require('../../../../controller/db_connection')
const user_schema = require('../../../../model/user_schema')
const common = require('../../../../controller/common')

//user registration
module.exports.registration = async function(req, res){
    try {
    let request_body = req.body
    let bdconnect = await db_connection.db_connect()
    let user_connection = bdconnect.model('users', user_schema)
    let one_user = await user_connection.findOne({email: request_body.email})
    console.log("one_user", one_user)
    if(one_user){
        res.send({message:"This email is alredy taken, please use other", status: false})
    }else{
         //hashpasswod
         let hashpassword = common.generate_password(request_body.password)
         request_body.password = hashpassword
 
         let create_user = new user_connection(request_body)
         let save_user = await create_user.save()
 
         if(save_user){
         res.send({message:"User registration successfully.", status: true, data: save_user})
         }else{
             res.send({message:"User registration successfully.", status: false})
         }
    }
    
    } catch (error) {
        console.log({error:error})
        res.send({message:"Something went wrong, please try again", status: false})
    }
}

//user login
module.exports.login = async function(req, res){

    try {
        let request_body = req.body
        let db_connect = await db_connection.db_connect()
        let user_connection = db_connect.model("users", user_schema)

        let one_user = await user_connection.findOne({email: request_body.email})
        if(one_user){
            if(common.check_password(request_body.password, one_user.password)){
                 let user_obj = {
                    _id: one_user._id,
                    name:one_user.name,
                    email:one_user.email,
                    city:one_user.city
                 }
                 let token = await common.generatejwt(user_obj)
                 res.send({message:"User login successfull.", token: token})
            }else{
                res.send({message:"Password is wrong."})
            }
        }else{
            res.send({message:"User not found."})
        }
    } catch (error) {
        console.log("error", error)
        res.send({message:"Something went wrong, please try again.", status: false})
    }
}

//get all user 
module.exports.get_all_users = async function(req, res){
    const decoded_token = common.decodedjwt(req.headers.authorization)
    if(decoded_token){
        try {
            let db_connect = await db_connection.db_connect()
            let user_connection = db_connect.model("users", user_schema)
            let users = await user_connection.find({})
            if(users.length != 0){
                res.send({message:"User list", data: users})
            }else{
                res.end({message:"User not found"})
            }
        } catch (error) {
            console.log("error", error)
            res.send({message:"Something went wrong, please try again.", status: false})
        }
    }else{
        res.send({message:"User invalid, please try again.", status: false})
    }
}