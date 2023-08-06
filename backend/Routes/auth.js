const express = require('express');
const User = require('../Models/User');
const Joi = require('joi');
 
const app = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../Middleware/fetchuser.js');

app.use(express.json());
let success = false;

app.post('/createuser', async (req,res)=>{

    try{
        const {value, error} =  validateUsers(req.body); 
       
        const salt = await bcrypt.genSalt(11);
        const hash = await bcrypt.hash(req.body.password, salt);
    
        if(!error) {

            const user = new User(); 
            user.name = req.body.name;
            user.password = hash;
            user.email = req.body.email; 
            await user.save(); 
            success = true;
            res.status(200).send(success); 

        }
        else{
            success = false;
        res.status(400).send( error.message); //bad request 400 joi error message
        }

    }
    catch(err){
        success = false
        res.status(400).send('Email already exists!');
        console.log(err.message); 
    }

    //Joi Validation
    function validateUsers(user){
        const schema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).min(6).max(100).required(),
            password: Joi.string().min(5).max(1024).required(),
            isAdmin: Joi.bool(),
            date: Joi.date()
        });
        return schema.validate(user); //have to pass a req.body arg

    }

})



app.post('/login', async (req,res)=>{

    try{
        const {error} =  validateUsers(req.body); //joi validation

        if(!error) {

            const {email, password} = req.body; 
            const user = await User.findOne({email});
            
            if(!user) return res.status(400).send('Invalid email or password');
            
            const matchpass = await bcrypt.compare(password, user.password);
            if(!matchpass) return res.status(400).send('Invalid email or password');
            //generating auth token if matched 
            const authToken = jwt.sign({id: user.id}, process.env.JWT_SECRET_KEY);
            
            res.status(200).send({authToken, name:user.name}); // success 200 and sending the user name info
            

        }
        else{
        res.status(404).send(error.message); //bad request 400 joi error message
        console.log(error);
        }

    }
    catch(err){
        res.send('Email already exists!');
        console.log(err.message); 
    }

    function validateUsers(user){
        const schema = Joi.object({
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).min(6).max(100).required(),
            password: Joi.string().min(5).max(1024).required()
        });
        return schema.validate(user); //have to pass a req.body arg

    }

})


app.get('/getuser', fetchuser, async (req,res)=>{

    try {
        const userId = req.userId;
        const user = await User.findById(userId).select('-password');
        res.send(user);

    } catch (error) {
        console.log(error);
        
    }

});

module.exports = app