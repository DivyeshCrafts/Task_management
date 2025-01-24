const http = require("http")
const express = require("express")
const app = express()
const prot = 8000

app.use(express.json({limit:"50mb"}))

const webapi_index = require('./route/v1/webapi/webapi_index')
app.use('/', webapi_index)

app.use((error, req, res, next)=>{
console.error(error.stack)
res.status(500).send('something went wrong')
})

http.createServer(app).listen(prot,()=>{
    console.log(`App listen on port ${prot}`)
})