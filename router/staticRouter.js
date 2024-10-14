const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.render('homepage');
})

router.get('/login',(reqr,res)=>{
    res.render('login');
})

router.get('/register',(req,res)=>{
    res.render('register');
})



module.exports=router;