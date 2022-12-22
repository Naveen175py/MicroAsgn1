const dotenv = require("dotenv");
dotenv.config();
const express=require("express");

const app=express();
const initializeDatabase = require("./config/db");
app.get("/api/health",(req,res)=>{
    res.send(`backend server is up and running:${new Date}`)
})
const mongoose = require("mongoose");
const mongoUrl = process.env.MONGODB_URI;

function databaseConnection() {
    mongoose.set("strictQuery", true);
    mongoose
        .connect(mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("Database Connected Successfully");
        })
        .catch((err) => {
            console.log("Database Not Connected Successfully : " + err);
        });
}

module.exports = databaseConnection;
const port=process.env.PORT||3000;
const host=process.env.HOST||'localhost';

app.listen(port,()=>{
    console.log(`Express server is listening at https://${host}:${port}`) 
});

