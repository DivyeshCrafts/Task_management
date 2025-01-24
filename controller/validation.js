const Validation = require('validatorjs')

const validation = function(req, rules, callback){
   const validation = new Validation(req, rules)
   validation.passes(()=>callback(null, true))
   validation.fails(()=>callback(validation.errors, false))
}

module.exports = validation