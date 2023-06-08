//import { Express } from "express";
const express = require('express')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.port || 5001
const colors = require('colors')

connectDB()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/tareas',require('./routes/TareasRoutes'))
app.use(errorHandler)

app.listen(port, ()=> {console.log('Server started on port '+port);})