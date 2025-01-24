const express = require('express')
const route = express.Router()

//user
const user_controller = require('./user/user_constrolle')
const user_validation = require('./user/user_validation')
route.post('/v1/webapi/user/registration', user_validation.registration, user_controller.registration)
route.post('/v1/webapi/user/login', user_validation.login, user_controller.login)
route.get('/v1/webapi/user/get_users', user_controller.get_all_users)

//task
const task_controller = require('./task/task_controller')
const task_validation = require('./task/task_validation')
route.post('/v1/webapi/task/add_edit', task_validation.add_edit, task_controller.add_edit)
route.post('/v1/webapi/task/delete', task_validation.delete_task, task_controller.delete)
route.post('/v1/webapi/task/data_table', task_controller.get_tasks)

module.exports = route