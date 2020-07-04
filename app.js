const express = require('express');
const jwt = require('jsonwebtoken');
const {PORT,SECTET_KEY} = require('./util');

const app = express();

app.get('/login',(req,res)=>{
    let user={
        name:'keval navadiya',
        email:'kevalnavadiya39@gmail.com',
    }
    jwt.sign({user},SECTET_KEY,(err,token)=>{
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
                message:'LogIn successfully',
                token
            });
        }
    })
})

app.post('/post',checkToken,(req,res)=>{
    jwt.verify(req.token,SECTET_KEY,(err,data)=>{
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
                message:'POST added',
                data
            });
        }
    })
})

function checkToken(req,res,next){
    let token = req.headers['authorization'];
    if(typeof token !== 'undefined'){
        req.token = token;
        next();
    }else{
        res.sendStatus(403);
    }
}

app.listen(PORT,console.log(`server running on port ${PORT}`));