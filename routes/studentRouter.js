const express = require('express')
const studentModel = require('../models/studentModel')
const isUserAuthorized = require('../middlewares/isUserAuthorized')
const studentsRouter = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

studentsRouter.post('/signup',async(req,res) => {
    const {username,password} = req.body
    // console.log(req.body)
    existingUser = await studentModel.findOne({username: username})
    if(!existingUser){
        const hash = bcrypt.hashSync(password,10)
        const newStudent = new studentModel({
            username: username,
            passwordHash : hash
        })
        await newStudent.save()
        res.json({
            message : "User created"
        })
    }
    else{
        res.json({
            message: "User already exists"
        })
    }

})

studentsRouter.post('/signin',async(req, res)=>{
    const {username, password} = req.body;
    console.log(req.body)
    existingUser = await studentModel.findOne({username: username})
    console.log(existingUser)
    if(existingUser){
        const isPasswordMatch = bcrypt.compareSync(password, existingUser.passwordHash)
        console.log(isPasswordMatch)
        if(isPasswordMatch){
            console.log(existingUser._id,existingUser.username)
            const token = jwt.sign({
                userId: existingUser._id,
                userName: existingUser.username
            }, 'secret')
            res.set('authorization', token)
            
            res.json({
                message:"user signed in"
            })
        }
        else{
            res.json({
                message:"Password Invalid"
            })
        }
    }
    else{
        res.json({
            message:"user doesnot exists"
        })
    }
})

studentsRouter.get('/user',isUserAuthorized,async(req,res) => {
    const {userId,username} = req.currentUser
    console.log(userId,username)
    res.json({
        userId: userId,
        username: username
    })
})





module.exports = studentsRouter