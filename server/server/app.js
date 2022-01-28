const express = require('express')
const cors = require('cors')
const app = express()
const mongoose =require('mongoose')
const PORT = 5000
const { MONGOURI }= require('./key')

require('./models/user')
require('./models/post')
app.use(express.json())
app.use(cors())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))

mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})


mongoose.connection.on('connected',() =>{
    console.log('connected to mongo yeahh', '')
})
mongoose.connection.on('errorrrr',(err) =>{
    console.log('err connected', err)
})


// const customMiddleware = (req, res, next) =>{
//     console.log('middleware executed!!', '')
//     next()
// }
// JtHLMNqogjsN9tZS

// app.use(customMiddleware) ////////this middleware apply on all routes

// app.get('/home', customMiddleware, (req, res) =>{ // this middleware is apply on only this routes
//     res.send('Hellow world')
// })
// app.get('/', (req, res) =>{
//     res.send('WellCome to dashboard')
// })
app.listen(PORT,() =>{
    console.log('server is running on ', PORT)
})