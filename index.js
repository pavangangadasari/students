const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const studentsRouter = require('./routes/studentRouter')

const app = express()

app.use(cors({
    origin:"*",
    methods:"*",
    allowedHeaders:"*",
    exposedHeaders:"*"
}))
app.use(express.json())
app.use('/students',studentsRouter)

const connectToDb = async() => {
    const url = "mongodb+srv://pavangangadasari:Pavan2000@cluster0.2vvme6s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    try{
        await mongoose.connect(url)
        console.log("Connected to DB")
    }
    catch(error){
        console.log(error)
    }
}

app.listen(8080,() =>{
    console.log("Server is running on 8080 port")
})

connectToDb()