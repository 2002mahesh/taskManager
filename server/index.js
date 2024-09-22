const express=require('express');
const app=express();
require('dotenv').config();
const dbConnection=require('./dbConnection/connection');
const authRoutes = require('./Routes/AuthRoute');
const taskRoutes = require('./Routes/taskRoute');
const cors=require('cors');



app.get('/',(req,res)=>{
    res.send("Hi Server");
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/',authRoutes);
app.use('/',taskRoutes);
dbConnection;


app.listen(process.env.PORT,()=>{
    console.log(`server connected at ${process.env.PORT}`);
})