//Configurations...
const sequelize = require('./database');
const express = require('express');
const studentRouter = require('./router/studentRouter');
const subjectRouter= require('./router/subjectRouter');
const teacherRouter = require('./router/teacherRouter');
const staticRouter= require('./router/staticRouter');
const authRouter = require('./router/authRouter');
require('dotenv').config();

const PORT = 5500;
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static('public'));
app.set('views','./views');
app.set('view engine','pug');

app.use('/',staticRouter);
app.use('/auth',authRouter);
app.use('/student',studentRouter);
app.use('/subject',subjectRouter);
app.use('/teacher',teacherRouter);

//running the application....
sequelize.sync({force:true})
        .then(()=>{
            return app.listen(PORT,()=>{
                console.log(`Server is running on port: ${PORT}` );
            })
        })
        .catch((error)=>{
            console.log('Unable to connect with the database',error);
        });

module.exports=app;
