const express = require('express');
const app = express.Router();
const jwt = require('jsonwebtoken');

app.use(express.json());

const fetchuser =  (req,res,next)=>{

    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Please enter a valid token');

    try{        
        const user =  jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.userId = user.id;
        next();

    }
    catch(err){
        res.status(501).send(err.message);
        console.log(err.message); 
    }
    //calling the next function
    
}

module.exports = fetchuser;