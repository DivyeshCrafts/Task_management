const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secratekey = "divyesh007"

module.exports.generate_password =async function(password){
 return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

module.exports.check_password = async function(password, db_password){
  return bcrypt.compareSync(password, db_password)
}

module.exports.generatejwt = async function(req_obj){
  return jwt.sign(req_obj, secratekey)
}

module.exports.decodedjwt = async function(generated_token){
   return jwt.verify(generated_token, secratekey, function(err, decoded){
        if(err){
            return false
        }else{
          return decoded
        }
   })
}