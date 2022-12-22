const dotenv = require("dotenv");
dotenv.config();
const express=require("express");

const app=express();
const initializeDatabase = require("./config/db");
app.get("/api/health",(req,res)=>{
    res.send(`backend server is up and running:${new Date}`)
})


const port=process.env.PORT||3000;
const host=process.env.HOST||'localhost';

app.listen(port,()=>{
    console.log(`Express server is listening at https://${host}:${port}`) 
});

